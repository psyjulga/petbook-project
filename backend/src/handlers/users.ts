import { Application, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserStore, User } from '../models/user'
import verifyAuthToken from '../util/authorization'

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
	try {
		const users = await store.index()
		res.status(200)
		res.json(users)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const show = async (req: Request, res: Response) => {
	try {
		const user = await store.show(req.params.id)
		res.status(200)
		res.json(user)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

// SIGN UP => token created
const create = async (req: Request, res: Response) => {
	const {
		user_name,
		first_name,
		last_name,
		email,
		country,
		city,
		profile_pic,
		password,
	} = req.body

	const user: User = {
		user_name,
		first_name,
		last_name,
		email,
		country,
		city,
		profile_pic,
		password,
	}

	try {
		const newUser = await store.create(user) // with hashed password
		const token = jwt.sign(
			{ user: newUser },
			process.env.TOKEN_SECRET as string
		)
		res.status(200)
		res.json(token) // or newUser?
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

// SIGN IN => token created
const authenticate = async (req: Request, res: Response) => {
	try {
		const { user_name, password } = req.body
		const authenticatedUser = await store.authenticate(
			// returns null or password / user ??
			user_name,
			password // entered password => checks if correct
		)
		const token = jwt.sign(
			{ user: authenticatedUser },
			process.env.TOKEN_SECRET as string
		)
		res.status(200)
		res.json(token)
	} catch (e) {
		res.status(401) // 401 => not authenticated
		res.json(e)
	}
}

const addPetToUser = async (req: Request, res: Response) => {
	const user_id: string = req.params.id
	const pet_id: string = req.body.pet_id

	try {
		const addedPet = await store.addPetToUser(user_id, pet_id)
		res.status(200)
		res.json(addedPet)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const removePetFromUser = async (req: Request, res: Response) => {
	const user_id: string = req.params.id
	const pet_id: string = req.body.pet_id

	try {
		const removedPet = await store.removePetFromUser(user_id, pet_id)
		res.status(200)
		res.json(removedPet)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const edit = async (req: Request, res: Response) => {
	const { id } = req.params
	const { field, value } = req.body

	try {
		const editedUser = await store.edit(id, field, value)
		res.status(200)
		res.json(editedUser)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const destroy = async (req: Request, res: Response) => {
	const { id } = req.params

	try {
		const deletedUser = await store.delete(id)
		console.log('deletedUser from destroy handler: ', deletedUser)
		res.status(200)
		res.json(deletedUser)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const user_routes = (app: Application) => {
	app.get('/users', index)
	app.get('/users/:id', verifyAuthToken, show)
	app.post('/users', create)
	app.get('/authenticate_user', authenticate)
	app.post('/users/:id/pets', verifyAuthToken, addPetToUser)
	app.delete('/users/:id/pets', verifyAuthToken, removePetFromUser)
	app.put('/users/:id', verifyAuthToken, edit)
	app.delete('/users/:id', verifyAuthToken, destroy)
}

export default user_routes
