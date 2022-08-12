import client from '../database'

export type Post = {
	post_id?: number
	date: string
	text: string
	image_path?: string
	video_path?: string
	author: string
	user_id: number
}

export class PostStore {
	async index(): Promise<Post[]> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'SELECT * FROM posts'
			const res = await conn.query(sql)
			return res.rows
		} catch (e) {
			throw new Error(`Error in PostStore index(): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async show(post_id: string): Promise<Post> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'SELECT * FROM posts WHERE post_id=($1)'
			const res = await conn.query(sql, [post_id])
			return res.rows[0]
		} catch (e) {
			throw new Error(`Error in PostStore show(${post_id}): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async create(post: Post): Promise<Post> {
		const { date, text, image_path, video_path, author, user_id } = post
		let conn
		try {
			conn = await client.connect()
			const sql = `INSERT INTO posts (
         post_id, date, text, image_path, video_path, author, user_id) 
         VALUES (default, $1, $2, $3, $4, $5, $6) RETURNING *`
			// does it insert null if not submitted (e.g. video)?
			const res = await conn.query(sql, [
				date,
				text,
				image_path,
				video_path,
				author,
				user_id,
			])
			return res.rows[0]
		} catch (e) {
			throw new Error(`Error in PostStore create(post): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async closeClient() {
		await client.end()
	}
}
