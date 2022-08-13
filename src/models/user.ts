import bcrypt from 'bcrypt'
import pepper from 'bcrypt'
import client from '../database'

export type User = {
	user_id?: number
	user_name: string
	first_name: string
	last_name: string
	email: string
	country: string
	city: string
	profile_pic_path: string
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
			profile_pic_path,
			password,
		} = user
		let conn
		try {
			conn = await client.connect()
			const sql = `INSERT INTO users (
          user_id, user_name, first_name, last_name, email, country, city, profile_pic_path, password) 
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
				profile_pic_path,
				hash,
			])
			const user = res.rows[0]
			return user
		} catch (e) {
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
			const petToUser = res.rows[0]
			return petToUser
		} catch (e) {
			throw new Error(
				`Error in UserStore addPetToUser(${user_id}, ${pet_id}): ${e}`
			)
		} finally {
			conn?.release()
		}
	}

	async edit(id: string, field: string, value: string | number): Promise<User> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'UPDATE users SET ($1) = ($2) WHERE id = ($3) RETURNING *'
			const res = await conn.query(sql, [field, value, id])
			const user = res.rows[0] // correct row?
			return user
		} catch (e) {
			throw new Error(
				`Error in UserStore edit(${id}, ${field}, ${value}): ${e}`
			)
		} finally {
			conn?.release()
		}
	}

	async delete(id: string): Promise<User> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'DELETE FROM users WHERE id = ($1)'
			const res = await conn.query(sql, [id])
			const book = res.rows[0]
			return book
			// return deleted user
		} catch (e) {
			throw new Error(`Error in UserStore delete(${id}): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async closeClient() {
		await client.end()
	}
}
