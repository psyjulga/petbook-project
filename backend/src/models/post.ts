import client from '../database'
import tableHasRelations from '../util/tableHasRelations'
import deleteFromTable from '../util/deleteFromTable'

export type Post = {
	post_id?: number
	date: string
	post_title: string
	text: string
	image?: string | null
	video?: string | null
	user_id: string
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
		const { date, post_title, text, image, video, user_id } = post

		let conn
		try {
			conn = await client.connect()
			const sql = `INSERT INTO posts (
         post_id, date, post_title, text, image, video, user_id) 
         VALUES (default, $1, $2, $3, $4, $5, $6) RETURNING *`

			const res = await conn.query(sql, [
				date,
				post_title,
				text,
				image,
				video,
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
			const sql = `UPDATE posts SET ${field} = ($1) WHERE post_id = ($2) RETURNING *`
			const res = await conn.query(sql, [value, id])
			const updatedPost = res.rows[0]
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
		const postHasComments = await tableHasRelations('comments', 'post_id', id)
		console.log('post has comments: ', postHasComments)

		if (postHasComments) {
			const deletedComments = await deleteFromTable('comments', 'post_id', id)
			console.log('deleted comments from deleted post: ', deletedComments)
		}

		const postHasLikes = await tableHasRelations('likes', 'post_id', id)

		if (postHasLikes) {
			const deletedLikes = await deleteFromTable('likes', 'post_id', id)
			console.log('deleted likes from deleted post: ', deletedLikes)
		}

		const deletedPosts = await deleteFromTable('posts', 'post_id', id)
		const deletedPost = deletedPosts[0]
		console.log('deleted post: ', deletedPost)

		return deletedPost
	}

	async closeClient() {
		await client.end()
	}
}
