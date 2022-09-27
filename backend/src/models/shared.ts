import { UploadedFile } from 'express-fileupload'
import client from '../database'

export class FileStore {
	async create(
		table: string,
		id: string,
		fileData: UploadedFile | UploadedFile[] | undefined
	): Promise<any> {
		const fileDataString = fileData?.toString()
		const dataWithX = `\\x${fileDataString}`

		console.log('STRING: ', dataWithX)

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
			const sql = `INSERT INTO ${table} (${col_name}) 
         VALUES (${dataWithX}) WHERE ${id_name} = ${id} RETURNING *`
			console.log('SQL: ', sql)
			const res = await conn.query(sql)
			return res
		} catch (e) {
			console.log(`Error in FileStore create(): ${e}`)
			throw new Error(`Error in FileStore create(): ${e}`)
		} finally {
			conn?.release()
		}
	}
}
