import client from '../database'

export type Pet = {
	pet_id?: number
	type: string
	breed: string
	name: string
	birthday: string
	color: string
	eye_color: string
	profile_pic: string
}

export class PetStore {
	async index(): Promise<Pet[]> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'SELECT * FROM pets'
			const res = await conn.query(sql)
			return res.rows
		} catch (e) {
			throw new Error(`Error in PetStore index(): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async show(pet_id: string): Promise<Pet> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'SELECT * FROM pets WHERE pet_id=($1)'
			const res = await conn.query(sql, [pet_id])
			return res.rows[0]
		} catch (e) {
			throw new Error(`Error in PetStore show(${pet_id}): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async showPetsByUser(user_id: string): Promise<Pet[]> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'SELECT * FROM pets WHERE user_id=($1)'
			const res = await conn.query(sql, [user_id])
			return res.rows
		} catch (e) {
			throw new Error(`Error in PetStore showPetsByUser(${user_id}): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async showPetsByProp(field: string, value: string | number): Promise<Pet[]> {
		let conn
		try {
			conn = await client.connect()
			const sql = `SELECT * FROM pets WHERE ($1) = ($2)`
			const res = await conn.query(sql, [field, value])
			const pets = res.rows
			return pets
		} catch (e) {
			throw new Error(
				`Error in PetStore showPetsByProp(${field}, ${value}): ${e}`
			)
		} finally {
			conn?.release()
		}
	}

	async create(pet: Pet): Promise<Pet> {
		const { type, breed, name, birthday, color, eye_color, profile_pic } = pet
		let conn
		try {
			conn = await client.connect()
			const sql = `INSERT INTO pets (
          pet_id, type, breed, name, birthday, color, eye_color, profile_pic) 
          VALUES (default, $1, $2, $3, $4, $5, $6, $7) RETURNING *`
			const res = await conn.query(sql, [
				type,
				breed,
				name,
				birthday,
				color,
				eye_color,
				profile_pic,
			])
			return res.rows[0]
		} catch (e) {
			throw new Error(`Error in PetStore create(pet): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async edit(id: string, field: string, value: string | number): Promise<Pet> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'UPDATE pets SET ($1) = ($2) WHERE id = ($3) RETURNING *'
			const res = await conn.query(sql, [field, value, id])
			const pet = res.rows[0] // correct row?
			return pet
		} catch (e) {
			throw new Error(`Error in PetStore edit(${id}, ${field}, ${value}): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async delete(id: string): Promise<Pet> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'DELETE FROM pets WHERE id = ($1)'
			const res = await conn.query(sql, [id])
			const pet = res.rows[0]
			return pet
			// return deleted pet
		} catch (e) {
			throw new Error(`Error in PetStore delete(${id}): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async closeClient() {
		await client.end()
	}
}
