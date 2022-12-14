import bcrypt from 'bcrypt'
import pepper from 'bcrypt'
import client from '../database'
import tableHasRelations from '../util/tableHasRelations'
import selectFromTable from '../util/selectFromTable'
import removePetFromUser from '../util/removePetFromUser'
import insertIntoTable from '../util/insertIntoTable'
import convertTimestamp from '../util/convertTimestamp'

import { PetStore } from './pet'
import { PostStore } from './post'
import { Comment, CommentStore } from './comment'
import { Like, LikeStore } from './like'

const petStore = new PetStore()
const postStore = new PostStore()
const commentStore = new CommentStore()
const likeStore = new LikeStore()

export type User = {
	user_id?: number
	user_name: string
	first_name: string
	last_name: string
	about_paragraph?: string | null
	email: string
	country: string
	city: string
	profile_pic?: string | null
	password: string
}

export type UserPet = {
	users_pets_id?: string
	user_id: string
	pet_id: string
}

export class UserStore {
	async index(): Promise<User[]> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'SELECT * FROM users'
			const res = await conn.query(sql)
			return res.rows
		} catch (e) {
			console.log('Error in UserStore index: ', e)
			throw new Error(`Error in UserStore index(): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async show(user_id: string): Promise<User> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'SELECT * FROM users WHERE user_id=($1)'
			const res = await conn.query(sql, [user_id])
			return res.rows[0]
		} catch (e) {
			console.log('Error in UserStore show: ', e)
			throw new Error(`Error in UserStore show(${user_id}): ${e}`)
		} finally {
			conn?.release()
		}
	}

	// SIGN UP => password hashing
	async create(user: User): Promise<User | null> {
		const {
			user_name,
			first_name,
			last_name,
			about_paragraph,
			email,
			country,
			city,
			profile_pic,
			password,
		} = user

		// check if user_name already exists
		let conn

		try {
			conn = await client.connect()
			const sql = 'SELECT * FROM users WHERE user_name=($1)'
			const res = await conn.query(sql, [user_name])
			const user_name_rows = res.rows
			if (user_name_rows.length) {
				return null
			}
		} catch (e) {
			console.log('Error in UserStore create - check username: ', e)
			throw new Error(
				`Error in UserStore create - check username(${user_name}): ${e}`
			)
		} finally {
			conn?.release()
		}

		// create new user
		try {
			conn = await client.connect()
			const sql = `INSERT INTO users (
          user_id, user_name, first_name, last_name, about_paragraph, email, country, city, profile_pic, password) 
          VALUES(default, $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`

			const saltRounds = process.env.SALT_ROUNDS
			const hash = bcrypt.hashSync(
				password + pepper,
				parseInt(saltRounds as string)
			)

			const res = await conn.query(sql, [
				user_name,
				first_name,
				last_name,
				about_paragraph,
				email,
				country,
				city,
				profile_pic,
				hash,
			])
			const user = res.rows[0]
			return user
		} catch (e) {
			console.log('Error in UserStore create: ', e)
			throw new Error(`Error in UserStore create(user): ${e}`)
		} finally {
			conn?.release()
		}
	}

	// SIGN IN => check password
	async authenticate(
		user_name: string,
		password: string
	): Promise<User | null> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'SELECT password FROM users WHERE user_name=($1)'

			const res = await conn.query(sql, [user_name])

			if (res.rows.length) {
				const passwordFromUser = res.rows[0]

				if (
					bcrypt.compareSync(
						password + pepper, // entered pw
						passwordFromUser.password // pw from db
					)
				) {
					return passwordFromUser // encrypted pw from db
				}
			}
			return null
		} catch (e) {
			console.log('Error in UserStore authenticate: ', e)
			throw new Error(
				`Error in UserStore authenticate(${user_name},${password}): ${e}`
			)
		} finally {
			conn?.release()
		}
	}

	async addPetToUser(user_id: string, pet_id: string): Promise<UserPet> {
		let conn

		// we add a pet to the logged in user
		// for that we use the JOIN TABLE => users_pets
		try {
			conn = await client.connect()
			const sql = `INSERT INTO users_pets (
         users_pets_id, user_id, pet_id) 
         VALUES(default, $1, $2) RETURNING *`
			const res = await conn.query(sql, [user_id, pet_id])
			const addedPet = res.rows[0]
			return addedPet
		} catch (e) {
			console.log('Error in UserStore addPetToUser: ', e)
			throw new Error(
				`Error in UserStore addPetToUser(${user_id}, ${pet_id}): ${e}`
			)
		} finally {
			conn?.release()
		}
	}

	async removePetFromUser(user_id: string, pet_id: string): Promise<UserPet> {
		const removedPet = await removePetFromUser(user_id, pet_id)
		return removedPet
	}

	async edit(user_id: string, field: string, value: string): Promise<User> {
		let conn
		try {
			conn = await client.connect()
			const sql = `UPDATE users SET ${field} = ($1) WHERE user_id = ($2) RETURNING *`
			const res = await conn.query(sql, [value, user_id])
			const updatedUser = res.rows[0]
			return updatedUser
		} catch (e) {
			console.log('Error in UserStore edit: ', e)
			throw new Error(
				`Error in UserStore edit(${user_id}, ${field}, ${value}): ${e}`
			)
		} finally {
			conn?.release()
		}
	}

	// helper methods for deleting a user
	// 1. delete the users' pets
	// 2. delete the users' posts
	// 3. handle the users' comments (set the user_id to null)
	// 4. handle the users' likes (set the user_id to null)

	async deleteUsersPets(user_id: string): Promise<void> {
		const pet_ids = await selectFromTable(
			'pet_id',
			'users_pets',
			'user_id',
			user_id
		)

		pet_ids?.forEach(async (pet_id_obj: { pet_id: string }) => {
			const pet_id = pet_id_obj.pet_id
			const deletedPet = await petStore.delete(pet_id, user_id)
			console.log('deleted pet: ', deletedPet)
		})
	}

	async deleteUsersPosts(user_id: string): Promise<void> {
		const post_ids = await selectFromTable(
			'post_id',
			'posts',
			'user_id',
			user_id
		)

		post_ids?.forEach(async (post_id_obj: { post_id: string }) => {
			const post_id = post_id_obj.post_id
			const deletedPost = await postStore.delete(post_id)
			console.log('deleted post: ', deletedPost)
		})
	}

	async handleUsersComments(user_id: string): Promise<void> {
		// set the user_id to null
		const comments = await selectFromTable('*', 'comments', 'user_id', user_id)

		comments?.forEach(async (comment: Comment) => {
			const { comment_id } = comment
			const editedComment = await commentStore.edit(
				comment_id as number,
				'user_id',
				null
			)
			console.log('edited comment from deleted user: ', editedComment)
		})
	}

	async handleUsersLikes(user_id: string): Promise<void> {
		// set the user_id to null
		const likes = await selectFromTable('*', 'likes', 'user_id', user_id)

		likes?.forEach(async (like: Like) => {
			const { like_id } = like

			const editedLike = await likeStore.edit(like_id as number)
			console.log('edited like from deleted user: ', editedLike)
		})
	}

	async delete(user_id: string): Promise<User> {
		// 1. delete / handle users' pets, posts, comments, likes
		const userHasPets = await tableHasRelations(
			'users_pets',
			'user_id',
			user_id
		)
		console.log('user has pets: ', userHasPets)
		if (userHasPets) {
			await this.deleteUsersPets(user_id)
		}

		const userHasPosts = await tableHasRelations('posts', 'user_id', user_id)
		if (userHasPosts) {
			await this.deleteUsersPosts(user_id)
		}

		const userHasComments = await tableHasRelations(
			'comments',
			'user_id',
			user_id
		)
		if (userHasComments) {
			await this.handleUsersComments(user_id)
		}

		const userHasLikes = await tableHasRelations('likes', 'user_id', user_id)
		if (userHasLikes) {
			await this.handleUsersLikes(user_id)
		}

		// 2. delete user
		let conn
		try {
			conn = await client.connect()
			const sql = 'DELETE FROM users WHERE user_id = ($1) RETURNING *'
			const res = await conn.query(sql, [user_id])
			const deletedUser = res.rows[0]
			return deletedUser
		} catch (e) {
			console.log('Error in UserStore delete: ', e)
			throw new Error(`Error in UserStore delete(${user_id}): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async closeClient() {
		await client.end()
	}
}
