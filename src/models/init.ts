import client from '../database'
import { User, UserStore, UserPet } from './user'
import { Pet, PetStore } from './pet'
import { Post, PostStore } from './post'
import { Comment, CommentStore } from './comment'
import { Like, LikeStore } from './like'

const userStore = new UserStore()
const petStore = new PetStore()
const postStore = new PostStore()
const commentStore = new CommentStore()
const likeStore = new LikeStore()

export type InitialData = {
	users: User[]
	pets: Pet[]
	usersPets: UserPet[]
	posts: Post[]
	comments: Comment[]
	likes: Like[]
}

async function getJoinTable(): Promise<UserPet[]> {
	let conn
	try {
		conn = await client.connect()
		const sql = `SELECT * FROM users_pets`
		const res = await conn.query(sql)
		const usersPets = res.rows
		return usersPets
	} catch (e) {
		console.log('Error in getJoinTable: ', e)
		throw new Error(`Error in getJoinTable: ${e}`)
	} finally {
		conn?.release()
	}
}

export class InitStore {
	async index(): Promise<InitialData> {
		const users = await userStore.index()
		const pets = await petStore.index()
		const usersPets = await getJoinTable()
		const posts = await postStore.index()
		const comments = await commentStore.index() // includes commentsFromDeletedUsers
		const likes = await likeStore.index() // includes likesFromDeletedUsers

		return { users, pets, usersPets, posts, comments, likes }
	}
}
