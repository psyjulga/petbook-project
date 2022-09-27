import { Application, Request, Response } from 'express'

const create = async (req: Request, res: Response) => {
	// const {file} = req.files
	console.log('shared handler req.params.id: ', req.params.id)
	console.log('shared handler req.files: ', req.files)
	console.log('shared handler req.body: ', req.body)
	res.json('okay')
	// try {
	// 	const upload = await store.create(file)
	// 	res.status(200)
	// 	res.json(upload)
	// } catch (e) {
	// 	res.status(400)
	// 	res.json(e)
	// }
}

const shared_routes = (app: Application) => {
	app.post('/shared/:id', create)
	// app.put('/shared/:id', edit)
	// app.delete('/shared/:id', destroy)
}

export default shared_routes
