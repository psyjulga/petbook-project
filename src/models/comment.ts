import client from '../database'

export type Comment = {
	comment_id?: number
	date: string
	text: string
	post_id: string
	user_id: string
}

export class CommentStore {
	async index(): Promise<Comment[]> {
		let conn
		try {
			conn = await client.connect()
			const sql1 = 'SELECT * FROM comments'
			const res1 = await conn.query(sql1)
			const sql2 = 'SELECT * FROM commentsFromDeletedUsers'
			const res2 = await conn.query(sql2)
			const res = res1.rows.concat(res2.rows)
			console.log('concatenated comments in model index: ', res)
			return res
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
			const sql1 = 'SELECT * FROM comments WHERE post_id=($1)'
			const res1 = await conn.query(sql1, [post_id])
			const sql2 = 'SELECT * FROM commentsFromDeletedUsers WHERE post_id=($1)'
			const res2 = await conn.query(sql2, [post_id])
			const res = res1.rows.concat(res2.rows)
			console.log('concatenated comments in model showByPost: ', res)
			return res
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

	async edit(id: string, value: string): Promise<Comment> {
		let conn
		try {
			conn = await client.connect()
			const sql =
				'UPDATE comments SET text = ($1) WHERE comment_id = ($2) RETURNING *'
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
