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

const showPetsByUser = async (req: Request, res: Response) => {
	try {
		const petsByUser = await store.showPetsByUser(req.params.id)
		res.status(200)
		res.json(petsByUser)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const showPetsByProp = async (req: Request, res: Response) => {
	const { field, value } = req.body
	try {
		const petsByProp = await store.showPetsByProp(field, value)
		res.status(200)
		res.json(petsByProp)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const create = async (req: Request, res: Response) => {
	const {
		type,
		breed,
		pet_name,
		birthday,
		color,
		eye_color,
		profile_pic,
		about_paragraph,
	} = req.body

	const pet = {
		type,
		breed,
		pet_name,
		birthday,
		color,
		eye_color,
		profile_pic,
		about_paragraph,
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

const edit = async (req: Request, res: Response) => {
	const { id } = req.params
	const { field, value } = req.body
	try {
		const editedPet = await store.edit(id, field, value)
		res.status(200)
		res.json(editedPet)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const destroy = async (req: Request, res: Response) => {
	const { id } = req.params
	const { user_id } = req.body

	try {
		const deletedPet = await store.delete(id, user_id)
		res.status(200)
		res.json(deletedPet)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const pet_routes = (app: Application) => {
	app.get('/pets', verifyAuthToken, index)
	app.get('/pets/:id', verifyAuthToken, show)
	app.get('/pets/:id/users', verifyAuthToken, showPetsByUser)
	app.get('/filter_pets', verifyAuthToken, showPetsByProp)
	app.post('/pets', verifyAuthToken, create)
	app.put('/pets/:id', verifyAuthToken, edit)
	app.delete('/pets/:id', verifyAuthToken, destroy)
}

export default pet_routes
