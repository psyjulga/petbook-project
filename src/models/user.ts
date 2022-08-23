import bcrypt from 'bcrypt'
import pepper from 'bcrypt'
import client from '../database'
import tableHasRelations from '../util/tableHasRelations'
import deleteFromTable from '../util/deleteFromTable'
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
	email: string
	country: string
	city: string
	profile_pic?: string | null
	password: string
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
          user_id, user_name, first_name, last_name, email, country, city, profile_pic, password) 
          VALUES(default, $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`

			const saltRounds = process.env.SALT_ROUNDS
			const hash = bcrypt.hashSync(
				password + pepper,
				parseInt(saltRounds as string)
			)

			const res = await conn.query(sql, [
				user_name,
				first_name,
				last_name,
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
				console.log('password from user: ', passwordFromUser.password)
				if (
					bcrypt.compareSync(
						password + pepper, // entered pw
						passwordFromUser.password // pw from db
					)
				) {
					console.log('returning from auth: ', passwordFromUser)
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

	async addPetToUser(
		user_id: string,
		pet_id: string
	): Promise<{ users_pets_id: string; user_id: string; pet_id: string }> {
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

	async removePetFromUser(
		user_id: string,
		pet_id: string
	): Promise<{ users_pets_id: string; user_id: string; pet_id: string }> {
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
	// 3. handle the users' comments (preserve the comments => "deleted user")
	// 4. handle the users' likes (preserve the likes => "deleted likes")

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
		// !!!!!!!!!! FAILING IN HANDLER TEST
		// seems to not really be synchronous
		// maybe an issue with the loop?
		post_ids?.forEach(async (post_id_obj: { post_id: string }) => {
			const post_id = post_id_obj.post_id
			const deletedPost = await postStore.delete(post_id)
			console.log('deleted post: ', deletedPost)
		})
	}

	async handleUsersComments(user_id: string): Promise<void> {
		// 1. insert comments into table commentsFromDeletedUsers
		const comments = await selectFromTable('*', 'comments', 'user_id', user_id)
		comments?.forEach(async (comment: Comment) => {
			const { date, text, post_id } = comment
			const convertedDate = convertTimestamp(date.toString())
			const user_id = 'deleted_user'
			await insertIntoTable(
				'commentsFromDeletedUsers',
				['date', 'text', 'post_id', 'user_id'],
				[convertedDate, text, post_id, user_id]
			)
		})

		// 2. delete comments from comments table
		const comment_ids = await selectFromTable(
			'comment_id',
			'comments',
			'user_id',
			user_id
		)
		comment_ids?.forEach(async (comment_id_obj: { comment_id: string }) => {
			const comment_id = comment_id_obj.comment_id
			const deletedComment = await commentStore.delete(comment_id)
			console.log('deleted comment: ', deletedComment)
		})
	}

	async handleUsersLikes(user_id: string): Promise<void> {
		// 1. insert likes into table likesFromDeletedUsers
		const likes = await selectFromTable('*', 'likes', 'user_id', user_id)
		likes?.forEach(async (like: Like) => {
			const { post_id } = like
			const user_id = 'deleted_user'
			await insertIntoTable(
				'likesFromDeletedUsers',
				['like_id', 'user_id', 'post_id'],
				[user_id, post_id]
			)
		})

		// 2. delete likes from likes table
		const like_ids = await selectFromTable(
			'like_id',
			'likes',
			'user_id',
			user_id
		)
		like_ids?.forEach(async (like_id_obj: { like_id: string }) => {
			const like_id = like_id_obj.like_id
			const deletedLike = await likeStore.delete(like_id)
			console.log('deleted like: ', deletedLike)
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
