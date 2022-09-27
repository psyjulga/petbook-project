import { Application, Request, Response } from 'express'
import { FileStore } from '../models/shared'

const store = new FileStore()

const create = async (req: Request, res: Response) => {
	// @ts-ignore
	const fileData = req.files?.file.data
	const table = req.body.table
	const { id } = req.params

	console.log('shared handler file: ', fileData)
	console.log('shared handler table: ', table)

	try {
		const savedFile = await store.create(table, id, fileData)
		console.log('RES IN HANDLER: ', savedFile)
		res.status(200)
		res.json(savedFile)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const shared_routes = (app: Application) => {
	app.post('/shared/:id', create)
	// app.put('/shared/:id', edit)
	// app.delete('/shared/:id', destroy)
}

export default shared_routes
