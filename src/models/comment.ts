import client from '../database'

export type Comment = {
	comment_id?: number
	date: string
	text: string
	user_id: number
	post_id: number
}

export class CommentStore {
	async index(): Promise<Comment[]> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'SELECT * FROM post_comments'
			const res = await conn.query(sql)
			return res.rows
		} catch (e) {
			throw new Error(`Error in CommentStore index(): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async show(comment_id: string): Promise<Comment> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'SELECT * FROM post_comments WHERE comment_id=($1)'
			const res = await conn.query(sql, [comment_id])
			return res.rows[0]
		} catch (e) {
			throw new Error(`Error in CommentStore show(${comment_id}): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async showCommentsByPost(post_id: string): Promise<Comment[]> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'SELECT * FROM post_comments WHERE post_id=($1)'
			const res = await conn.query(sql, [post_id])
			return res.rows
		} catch (e) {
			throw new Error(
				`Error in CommentStore showCommentsByPost(${post_id}): ${e}`
			)
		} finally {
			conn?.release()
		}
	}

	async create(comment: Comment): Promise<Comment> {
		const { date, text, user_id, post_id } = comment
		let conn
		try {
			conn = await client.connect()
			const sql = `INSERT INTO post_comments (
				 comment_id, date, text, user_id, post_id) 
				 VALUES (default, $1, $2, $3, $4) RETURNING *`
			const res = await conn.query(sql, [date, text, user_id, post_id])
			return res.rows[0]
		} catch (e) {
			throw new Error(`Error in CommentStore create(comment): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async closeClient() {
		await client.end()
	}
}
