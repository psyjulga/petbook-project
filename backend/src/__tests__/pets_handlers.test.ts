import request from 'supertest'
import app from '../server'
import { Server } from 'http'
import { PetStore } from '../models/pet'

const store = new PetStore()
let server: Server

describe('Pet Handler', () => {
	server = app.listen()

	test('POST /pets/ calls create() and returns 200', async () => {
		const res = await request(server).post('/pets/').send({
			type: 'dog',
			breed: 'German Sheperd',
			name: 'Rex',
			birthday: '2016-06-06',
			color: 'black-brown',
			eye_color: 'brown',
			profile_pic: null,
		})

		expect(res.status).toBe(200)
	})

	test('GET /pets/ calls index() and returns 200', async () => {
		const res = await request(server).get('/pets/')
		expect(res.status).toBe(200)
	})

	test('GET /pets/:id calls show() and returns 200', async () => {
		const res = await request(server).get('/pets/1')
		expect(res.status).toBe(200)
	})

	test('GET /pets/:id/users calls showPetsByUser() and returns 200', async () => {
		const res = await request(server).get('/pets/1/users')
		expect(res.status).toBe(200)
	})

	test('GET /filter_pets calls showPetsByProp() and returns 200', async () => {
		const res = await request(server).get('/filter_pets').send({
			field: 'type',
			value: 'cat',
		})
		expect(res.status).toBe(200)
	})

	test('PUT /pets/:id calls edit() and returns 200', async () => {
		const res = await request(server).put('/pets/2').send({
			field: 'name',
			value: 'Anton the Rabbit',
		})
		expect(res.status).toBe(200)
	})

	test('DELETE /pets/:id calls destroy() and returns 200', async () => {
		const res = await request(server).delete('/pets/3').send({
			user_id: 1,
		})

		expect(res.status).toBe(200)

		await store.closeClient()
	})

	server.close()
})
