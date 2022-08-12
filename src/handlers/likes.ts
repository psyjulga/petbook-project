import { Application, Request, Response } from 'express'
import { LikeStore } from '../models/like'
import verifyAuthToken from '../util/authorization'

const store = new LikeStore()

const index = async (_req: Request, res: Response) => {
	try {
		const likes = await store.index()
		res.status(200)
		res.json(likes)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const showLikesByPost = async (req: Request, res: Response) => {
	try {
		const likesByPost = await store.showLikesByPost(req.params.id)
		res.status(200)
		res.json(likesByPost)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const create = async (req: Request, res: Response) => {
	const { user_id, post_id } = req.body

	const like = {
		user_id,
		post_id,
	}

	try {
		const newLike = await store.create(like)
		res.status(200)
		res.json(newLike)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const like_routes = (app: Application) => {
	app.get('/likes', index)
	app.get('/likes/:id/posts', showLikesByPost)
	app.post('/likes', verifyAuthToken, create)
}

export default like_routes
