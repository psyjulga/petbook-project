import client from '../database'

export type Like = {
	like_id?: number
	user_id?: string | null
	post_id: string
}

export class LikeStore {
	async index(): Promise<Like[]> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'SELECT * FROM likes'
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
			const sql = 'SELECT * FROM likes WHERE post_id=($1)'
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
			const sql = `INSERT INTO likes (
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

	async edit(id: number): Promise<Like> {
		let conn
		try {
			conn = await client.connect()
			const sql =
				'UPDATE likes SET user_id = null WHERE like_id = ($1) RETURNING *'
			// when a user is deleted, likes are preserved and shown as 'deleted user'

			const res = await conn.query(sql, [id])
			const updatedLike = res.rows[0]
			return updatedLike
		} catch (e) {
			console.log('Error in LikeStore edit', e)
			throw new Error(`Error in LikeStore edit(${id}): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async delete(id: string): Promise<Like> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'DELETE FROM likes WHERE like_id = ($1) RETURNING *'
			const res = await conn.query(sql, [id])
			const deletedLike = res.rows[0]
			return deletedLike
		} catch (e) {
			console.log('Error in LikeStore delete: ', e)
			throw new Error(`Error in LikeStore delete(${id}): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async closeClient() {
		await client.end()
	}
}
