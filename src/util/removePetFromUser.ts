import client from '../database'

export default async function removePetFromUser(
	user_id: string,
	pet_id: string
): Promise<{ users_pets_id: string; user_id: string; pet_id: string }> {
	let conn
	try {
		conn = await client.connect()
		const sql = `DELETE FROM users_pets WHERE user_id = ($1) AND pet_id = ($2) RETURNING *`
		const res = await conn.query(sql, [user_id, pet_id])
		const removedPet = res.rows[0]
		return removedPet
	} catch (e) {
		console.log('Error in removePetFromUser: ', e)
		throw new Error(`Error in removePetFromUser(${user_id}, ${pet_id}): ${e}`)
	} finally {
		conn?.release()
	}
}
