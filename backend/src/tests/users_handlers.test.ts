import request from 'supertest'
import app from '../server'
import { Server } from 'http'
import { UserStore } from '../models/user'

const store = new UserStore()
let server: Server

describe('User Handler', () => {
	server = app.listen()

	test('POST /users/ calls create() and returns 200', async () => {
		const res = await request(server).post('/users/').send({
			user_name: 'Johnny',
			first_name: 'John',
			last_name: 'Doe',
			email: 'johnny@web.com',
			country: 'United Kingdom',
			city: 'London',
			profile_pic: 'no pic',
			password: 'secret-password',
		})

		expect(res.status).toBe(200)
	})

	test('GET /users/ calls index() and returns 200', async () => {
		const res = await request(server).get('/users/')
		expect(res.status).toBe(200)
	})

	test('GET /users/:id calls show() and returns 200', async () => {
		const res = await request(server).get('/users/1')
		expect(res.status).toBe(200)
	})

	test('POST /authenticate_user calls authenticate() and returns 200', async () => {
		const res = await request(server).post('/authenticate_user').send({
			user_name: 'Johnny',
			password: 'secret-password',
		})

		expect(res.status).toBe(200)
	})

	test('POST /users/:id/pets calls addPetToUser() and returns 200', async () => {
		const res = await request(server)
			.post('/users/4/pets')
			.send({ pet_id: '5' })
		expect(res.status).toBe(200)
	})

	test('DELETE /users/:id/pets calls removePetFromUser() and returns 200', async () => {
		const res = await request(server)
			.delete('/users/4/pets')
			.send({ pet_id: '5' })
		expect(res.status).toBe(200)
	})

	test('PUT /users/:id calls edit() and returns 200', async () => {
		const res = await request(server).put('/users/1').send({
			field: 'city',
			value: 'Bonn',
		})
		expect(res.status).toBe(200)
	})

	test('DELETE /users/:id calls destroy() and returns 200', async () => {
		const res = await request(server).delete('/users/6')
		expect(res.status).toBe(200)

		await store.closeClient()
	})

	server.close()
})
