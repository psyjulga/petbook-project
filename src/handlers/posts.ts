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

const create = async (req: Request, res: Response) => {
	const { date, text, image_path, video_path, author, user_id } = req.body

	const post = {
		date,
		text,
		image_path,
		video_path,
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

const post_routes = (app: Application) => {
	app.get('/posts', verifyAuthToken, index)
	app.get('/posts/:id', verifyAuthToken, show)
	app.post('/posts', verifyAuthToken, create)
}

export default post_routes
