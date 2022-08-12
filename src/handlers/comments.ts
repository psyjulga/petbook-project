import { Application, Request, Response } from 'express'
import { CommentStore } from '../models/comment'
import verifyAuthToken from '../util/authorization'

const store = new CommentStore()

const index = async (_req: Request, res: Response) => {
	try {
		const comments = await store.index()
		res.status(200)
		res.json(comments)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const show = async (req: Request, res: Response) => {
	try {
		const comment = await store.show(req.params.id)
		res.status(200)
		res.json(comment)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const showCommentsByPost = async (req: Request, res: Response) => {
	try {
		const commentsByPost = await store.showCommentsByPost(req.params.id)
		res.status(200)
		res.json(commentsByPost)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const create = async (req: Request, res: Response) => {
	const { date, text, user_id, post_id } = req.body

	const comment = {
		date,
		text,
		user_id,
		post_id,
	}

	try {
		const newComment = await store.create(comment)
		res.status(200)
		res.json(newComment)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const comment_routes = (app: Application) => {
	app.get('/comments', index)
	app.get('/comments/:id', show)
	app.get('/comments/:id/posts', showCommentsByPost)
	app.post('/comments', verifyAuthToken, create)
}

export default comment_routes
