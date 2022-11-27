import { Application, Request, Response } from 'express'
import { FileStore } from '../models/shared'
import path from 'path'
import fs from 'fs'

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

	if (fs.existsSync(imagePath)) return
	// @ts-ignore
	else file.mv(imagePath)

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

const destroy = async (req: Request, res: Response) => {
	const { image } = req.params
	const imagePath = path.resolve(`../frontend/public/images/${image}`)

	// when a pet / post / user is deleted,
	// the whole object gets deleted from the DB (including the image)
	// via destroy pet / post / user
	// BUT we still need to remove the image from the frontend folder
	fs.unlink(imagePath, function (err) {
		if (err) throw err
		res.status(200)
		res.json(`Deleted file ${image} at path ${imagePath}`)
	})
}

const shared_routes = (app: Application) => {
	app.post('/shared/:id', create) // same logic as edit ??
	// app.put('/shared/:id', edit)
	app.delete('/shared/:image', destroy)
}

export default shared_routes
