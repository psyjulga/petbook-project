import { Application, Request, Response } from 'express'
import { PostStore } from '../models/post'
import verifyAuthToken from '../util/authorization'

const store = new PostStore()

const index = async (_req: Request, res: Response) => {
	try {
		const posts = await store.index()
		res.status(200)
		res.json(posts)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const show = async (req: Request, res: Response) => {
	try {
		const post = await store.show(req.params.id)
		res.status(200)
		res.json(post)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const showPostsByUser = async (req: Request, res: Response) => {
	try {
		const postsByUser = await store.showPostsByUser(req.params.id)
		res.status(200)
		res.json(postsByUser)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const create = async (req: Request, res: Response) => {
	const { date, text, image, video, author, user_id } = req.body

	const post = {
		date,
		text,
		image,
		video,
		author,
		user_id,
	}

	try {
		const newPost = await store.create(post)
		res.status(200)
		res.json(newPost)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const edit = async (req: Request, res: Response) => {
	const { id } = req.params
	const { field, value } = req.body
	try {
		const editedPost = await store.edit(id, field, value)
		res.status(200)
		res.json(editedPost)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const destroy = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const deletedPost = await store.delete(id)
		res.status(200)
		res.json(deletedPost)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const post_routes = (app: Application) => {
	app.get('/posts', verifyAuthToken, index)
	app.get('/posts/:id', verifyAuthToken, show)
	app.get('/posts/:id/users', verifyAuthToken, showPostsByUser)
	app.post('/posts', verifyAuthToken, create)
	app.put('/posts/:id', verifyAuthToken, edit)
	app.delete('/posts/:id', verifyAuthToken, destroy)
}

export default post_routes
