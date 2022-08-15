import client from '../database'
import tableHasRelations from '../util/tableHasRelations'
import deleteFromTable from '../util/deleteFromTable'
import removePetFromUser from '../util/removePetFromUser'

export type Pet = {
	pet_id?: number
	type: string
	breed?: string
	name: string
	birthday?: string
	color?: string
	eye_color?: string
	profile_pic?: string
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
			console.log('Error in PetStore index', e)
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
			console.log('Error in PetStore show', e)
			throw new Error(`Error in PetStore show(${pet_id}): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async showPetsByUser(user_id: string): Promise<Pet[] | []> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'SELECT * FROM users_pets WHERE user_id=($1)'
			const res = await conn.query(sql, [user_id])
			return res.rows
		} catch (e) {
			console.log('Error in PetStore showPetsByUser', e)
			throw new Error(`Error in PetStore showPetsByUser(${user_id}): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async showPetsByProp(field: string, value: string): Promise<Pet[] | []> {
		let conn
		try {
			conn = await client.connect()
			const sql = `SELECT * FROM pets WHERE ($1) = ($2)`
			const res = await conn.query(sql, [field, value])
			const filteredPets = res.rows
			return filteredPets
		} catch (e) {
			console.log('Error in PetStore showPetsByProps', e)
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
			console.log('Error in PetStore create', e)
			throw new Error(`Error in PetStore create(pet): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async edit(pet_id: string, field: string, value: string): Promise<Pet> {
		let conn
		try {
			conn = await client.connect()
			const sql = `UPDATE pets SET ${field} = ($1) WHERE pet_id = ($2) RETURNING *`
			const res = await conn.query(sql, [value, pet_id])
			const updatedPet = res.rows[0]
			return updatedPet
		} catch (e) {
			console.log('Error in PetStore edit', e)
			throw new Error(
				`Error in PetStore edit(${pet_id}, ${field}, ${value}): ${e}`
			)
		} finally {
			conn?.release()
		}
	}

	async delete(pet_id: string, user_id: string): Promise<Pet | string> {
		const removedPet = await removePetFromUser(user_id, pet_id)
		console.log('removed pet in pet model: ', removedPet)

		const petHasUsers = await tableHasRelations('users_pets', 'pet_id', pet_id)
		if (petHasUsers) {
			return `This pet does have multiple owners.
		        It was succesfully removed from your profile,
						but is still available for co-owners.`
		}

		const deletedPets = await deleteFromTable('pets', 'pet_id', pet_id)
		const deletedPet = deletedPets[0]
		return deletedPet
	}

	async closeClient() {
		await client.end()
	}
}
