import { Application, Request, Response } from 'express'
import { PetStore } from '../models/pet'
import verifyAuthToken from '../util/authorization'

const store = new PetStore()

const index = async (_req: Request, res: Response) => {
	try {
		const pets = await store.index()
		res.status(200)
		res.json(pets)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const show = async (req: Request, res: Response) => {
	try {
		const pet = await store.show(req.params.id)
		res.status(200)
		res.json(pet)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const create = async (req: Request, res: Response) => {
	const { type, breed, name, birthday, color, eye_color, profile_pic_path } =
		req.body

	const pet = {
		type,
		breed,
		name,
		birthday,
		color,
		eye_color,
		profile_pic_path,
	}

	try {
		const newPet = await store.create(pet)
		res.status(200)
		res.json(newPet)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const pet_routes = (app: Application) => {
	app.get('/pets', index)
	app.get('/pets/:id', show)
	app.post('/pets', verifyAuthToken, create)
}

export default pet_routes
