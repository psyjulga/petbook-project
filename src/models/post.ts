import client from '../database'

export type Post = {
	post_id?: number
	date: string
	text: string
	image?: string
	video?: string
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

	async showPostsByUser(user_id: string): Promise<Post[]> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'SELECT * FROM posts WHERE user_id=($1)'
			const res = await conn.query(sql, [user_id])
			return res.rows
		} catch (e) {
			throw new Error(`Error in PostStore showPostsByUser(${user_id}): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async create(post: Post): Promise<Post> {
		const { date, text, image, video, author, user_id } = post
		let conn
		try {
			conn = await client.connect()
			const sql = `INSERT INTO posts (
         post_id, date, text, image, video, author, user_id) 
         VALUES (default, $1, $2, $3, $4, $5, $6) RETURNING *`
			// does it insert null if not submitted (e.g. video)?
			const res = await conn.query(sql, [
				date,
				text,
				image,
				video,
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

	async edit(id: string, field: string, value: string | number): Promise<Post> {
		let conn
		try {
			conn = await client.connect()
			const sql_text = `UPDATE posts SET text = ($1) WHERE post_id = ($2) RETURNING *`
			const sql_author = `UPDATE posts SET author = ($1) WHERE post_id = ($2) RETURNING *`
			const res = await conn.query((field = 'text' ? sql_text : sql_author), [
				value,
				id,
			])
			const updatedPost = res.rows[0]
			console.log('updated post: ', updatedPost)
			return updatedPost
		} catch (e) {
			console.log('Error in PostStore edit: ', e)
			throw new Error(
				`Error in PostStore edit(${id}, ${field}, ${value}): ${e}`
			)
		} finally {
			conn?.release()
		}
	}

	async delete(id: string): Promise<Post> {
		let conn
		// to delete a post we first have to check if there are comments and likes
		// if so, comments and likes have to be deleted first
		try {
			conn = await client.connect()
			const sql1 = 'SELECT * FROM comments WHERE post_id = ($1)'
			const res1 = await conn.query(sql1, [id])
			const comments = res1.rows

			if (comments.length) {
				const sql2 = 'DELETE FROM comments WHERE post_id = ($1) RETURNING *'
				const res2 = await conn.query(sql2, [id])
				const deletedComments = res2.rows
			}
		} catch (e) {
			console.log('Error in PostStore delete - delete comments: ', e)
			throw new Error(`Error in PostStore delete(${id}): ${e}`)
		} finally {
			conn?.release()
		}

		try {
			conn = await client.connect()
			const sql1 = 'SELECT * FROM likes WHERE post_id = ($1)'
			const res1 = await conn.query(sql1, [id])
			const likes = res1.rows

			if (likes.length) {
				const sql2 = 'DELETE FROM likes WHERE post_id = ($1) RETURNING *'
				const res2 = await conn.query(sql2, [id])
				const deletedLikes = res2.rows
			}
		} catch (e) {
			console.log('Error in PostStore delete - delete likes: ', e)
			throw new Error(`Error in PostStore delete(${id}): ${e}`)
		} finally {
			conn?.release()
		}

		try {
			conn = await client.connect()
			const sql = 'DELETE FROM posts WHERE post_id = ($1) RETURNING *'
			const res = await conn.query(sql, [id])
			const deletedPost = res.rows[0]
			return deletedPost
		} catch (e) {
			console.log('Error in PostStore delete: ', e)
			throw new Error(`Error in PostStore delete(${id}): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async closeClient() {
		await client.end()
	}
}
