import client from '../database'
import tableHasRelations from '../util/tableHasRelations'
import deleteFromTable from '../util/deleteFromTable'

export type Post = {
	post_id?: number
	date: string
	text: string
	image?: string | null
	video?: string | null
	author: string
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
		const { date, text, image, video, author, user_id } = post
		let conn
		try {
			conn = await client.connect()
			const sql = `INSERT INTO posts (
         post_id, date, text, image, video, author, user_id) 
         VALUES (default, $1, $2, $3, $4, $5, $6) RETURNING *`
			// does it insert null if not submitted (e.g. video)?=> yes
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
		const postHasCommentsFromDeletedUsers = await tableHasRelations(
			'commentsFromDeletedUsers',
			'post_id',
			id
		)

		if (postHasComments) {
			const deletedComments = await deleteFromTable('comments', 'post_id', id)
			console.log('deleted comments from deleted post: ', deletedComments)
		}
		if (postHasCommentsFromDeletedUsers) {
			const deletedComments = await deleteFromTable(
				'commentsFromDeletedUsers',
				'post_id',
				id
			)
			console.log(
				'deleted comments from deleted post - deleted user table: ',
				deletedComments
			)
		}

		const postHasLikes = await tableHasRelations('likes', 'post_id', id)
		const postHasLikesFromDeletedUsers = await tableHasRelations(
			'likesFromDeletedUsers',
			'post_id',
			id
		)

		if (postHasLikes) {
			const deletedLikes = await deleteFromTable('likes', 'post_id', id)
			console.log('deleted likes from deleted post: ', deletedLikes)
		}
		if (postHasLikesFromDeletedUsers) {
			const deletedLikes = await deleteFromTable(
				'likesFromDeletedUsers',
				'post_id',
				id
			)
			console.log(
				'deleted likes from deleted post - deleted user table: ',
				deletedLikes
			)
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
