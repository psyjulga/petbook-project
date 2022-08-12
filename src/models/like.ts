import client from '../database'

export type Like = {
	like_id?: number
	user_id: number
	post_id: number
}

export class LikeStore {
	async index(): Promise<Like[]> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'SELECT * FROM post_likes'
			const res = await conn.query(sql)
			return res.rows
		} catch (e) {
			throw new Error(`Error in LikeStore index(): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async showLikesByPost(post_id: string): Promise<Like[]> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'SELECT * FROM post_likes WHERE post_id=($1)'
			const res = await conn.query(sql, [post_id])
			return res.rows
		} catch (e) {
			throw new Error(`Error in LikeStore showLikesByPost(${post_id}): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async create(like: Like): Promise<Like> {
		const { user_id, post_id } = like
		let conn
		try {
			conn = await client.connect()
			const sql = `INSERT INTO post_likes (
         like_id, user_id, post_id) 
         VALUES (default, $1, $2) RETURNING *`
			const res = await conn.query(sql, [user_id, post_id])
			return res.rows[0]
		} catch (e) {
			throw new Error(`Error in LikeStore create(like): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async closeClient() {
		await client.end()
	}
}
