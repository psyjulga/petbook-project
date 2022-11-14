import { Application, Request, Response } from 'express'
import { FileStore } from '../models/shared'
import path from 'path'

const store = new FileStore()

const create = async (req: Request, res: Response) => {
	if (!req.files) {
		console.log('no files were uploaded')
		return res.status(400).send('No files were uploaded.')
	}

	const file = req.files?.file
	// @ts-ignore
	const fileName = file.name
	const table = req.body.table
	const { id } = req.params

	// save image file to local images folder
	const imagePath = path.resolve(`../frontend/public/images/${fileName}`)
	// @ts-ignore
	file.mv(imagePath)

	// save image path to database
	try {
		const savedFile = await store.create(table, id, fileName) // updated user object with image file name
		res.status(200)
		res.json(savedFile)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const shared_routes = (app: Application) => {
	app.post('/shared/:id', create) // same logic as edit ??
	// app.put('/shared/:id', edit)
	// app.delete('/shared/:id', destroy)
}

export default shared_routes
