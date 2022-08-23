import client from '../database'

export type Like = {
	like_id?: number
	user_id: string
	post_id: string
}

export class LikeStore {
	async index(): Promise<Like[]> {
		let conn
		try {
			conn = await client.connect()
			const sql1 = 'SELECT * FROM likes'
			const res1 = await conn.query(sql1)
			const sql2 = 'SELECT * FROM likesFromDeletedUsers'
			const res2 = await conn.query(sql2)
			const res = res1.rows.concat(res2.rows)
			console.log('concatenated likes in model index: ', res)
			return res
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
			const sql1 = 'SELECT * FROM likes WHERE post_id=($1)'
			const res1 = await conn.query(sql1, [post_id])
			const sql2 = 'SELECT * FROM likesFromDeletedUsers WHERE post_id=($1)'
			const res2 = await conn.query(sql2, [post_id])
			const res = res1.rows.concat(res2.rows)
			console.log('concatenated likes in model showByPost: ', res)
			return res
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

	async delete(id: string): Promise<Comment> {
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
