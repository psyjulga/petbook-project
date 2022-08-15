import bcrypt from 'bcrypt'
import pepper from 'bcrypt'
import client from '../database'
import tableHasRelations from '../util/tableHasRelations'
import deleteFromTable from '../util/deleteFromTable'
import selectFromTable from '../util/selectFromTable'
import removePetFromUser from '../util/removePetFromUser'

import { PetStore } from './pet'
const petStore = new PetStore()

export type User = {
	user_id?: number
	user_name: string
	first_name: string
	last_name: string
	email: string
	country: string
	city: string
	profile_pic?: string
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
	async create(user: User): Promise<User> {
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
		let conn
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
				if (
					bcrypt.compareSync(
						password + pepper, // entered pw
						passwordFromUser.password // pw from db
					)
				) {
					return passwordFromUser
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
		console.log('removed pet in user model: ', removedPet)
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

	async delete(user_id: string): Promise<User> {
		let conn
		// user has pets? => delete
		const userHasPets = await tableHasRelations(
			'users_pets',
			'user_id',
			user_id
		)
		console.log('user has pets: ', userHasPets)
		if (userHasPets) {
			const pet_ids = await selectFromTable(
				'pet_id',
				'users_pets',
				'user_id',
				user_id
			)
			console.log('pet_ids: ', pet_ids)
			pet_ids?.forEach((pet_id_obj: { pet_id: string }) => {
				const pet_id = pet_id_obj.pet_id
				console.log('pet id: ', pet_id)
				petStore.delete(pet_id, user_id)
			})
		}

		// user has posts? => delete (comments and likes first)
		// user has comments => preserve! => "deleted user" => new table
		// user has likes => preserve! => "deleted user" => new table
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
