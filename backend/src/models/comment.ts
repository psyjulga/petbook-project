import client from '../database'

export type Comment = {
	comment_id?: number
	date: string
	text: string
	post_id: string
	user_id?: string | null
}

export class CommentStore {
	async index(): Promise<Comment[]> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'SELECT * FROM comments'
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
			const sql = 'SELECT * FROM comments WHERE comment_id=($1)'
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
			const sql = 'SELECT * FROM comments WHERE post_id=($1)'
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
			const sql = `INSERT INTO comments (
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

	async edit(
		id: number,
		field: string,
		value: string | null
	): Promise<Comment> {
		let conn
		try {
			conn = await client.connect()
			const sqlText =
				'UPDATE comments SET text = ($1) WHERE comment_id = ($2) RETURNING *'
			// when a user is deleted, comments are preserved and shown as 'deleted user'
			const sqlUser =
				'UPDATE comments SET user_id = ($1) WHERE comment_id = ($2) RETURNING *'

			const sql = field === 'text' ? sqlText : sqlUser
			const res = await conn.query(sql, [value, id])
			const updatedComment = res.rows[0]
			return updatedComment
		} catch (e) {
			console.log('Error in CommentStore edit', e)
			throw new Error(`Error in CommentStore edit(${id}, ${value}): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async delete(id: string): Promise<Comment> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'DELETE FROM comments WHERE comment_id = ($1) RETURNING *'
			const res = await conn.query(sql, [id])
			const deletedComment = res.rows[0]
			return deletedComment
		} catch (e) {
			throw new Error(`Error in CommentStore delete(${id}): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async closeClient() {
		await client.end()
	}
}
