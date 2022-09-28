import client from '../database'

export class FileStore {
	async create(table: string, id: string, fileName: string): Promise<any> {
		let conn

		let id_name
		let col_name

		if (table === 'users') {
			id_name = 'user_id'
			col_name = 'profile_pic'
		}

		if (table === 'pets') {
			id_name = 'pet_id'
			col_name = 'profile_pic'
		}

		if (table === 'posts') {
			id_name = 'post_id'
			col_name = 'image'
		}

		try {
			conn = await client.connect()
			const sql = `UPDATE ${table} SET ${col_name} = '${fileName}' WHERE ${id_name} = ${id} RETURNING *`
			const res = await conn.query(sql)
			return res.rows[0]
		} catch (e) {
			console.log(`Error in FileStore create(): ${e}`)
			throw new Error(`Error in FileStore create(): ${e}`)
		} finally {
			conn?.release()
		}
	}
}
