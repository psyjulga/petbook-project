import request from 'supertest'
import app from '../server'
import { Server } from 'http'
import { LikeStore } from '../models/like'

const store = new LikeStore()
let server: Server

describe('Like Handler', () => {
	server = app.listen()

	test('POST /likes/ calls create() and returns 200', async () => {
		const res = await request(server).post('/likes/').send({
			user_id: '2',
			post_id: '2',
		})

		expect(res.status).toBe(200)
	})

	test('GET /likes/ calls index() and returns 200', async () => {
		const res = await request(server).get('/likes/')
		expect(res.status).toBe(200)
	})

	test('GET /likes/:id/posts calls showLikesByPost() and returns 200', async () => {
		const res = await request(server).get('/likes/1/posts')
		expect(res.status).toBe(200)
	})

	test('DELETE /likes/:id calls destroy() and returns 200', async () => {
		const res = await request(server).delete('/likes/1')
		expect(res.status).toBe(200)

		await store.closeClient()
	})

	server.close()
})
