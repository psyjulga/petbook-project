import request from 'supertest'
import app from '../server'
import { Server } from 'http'
import { PostStore } from '../models/post'

const store = new PostStore()
let server: Server

describe('Post Handler', () => {
	server = app.listen()

	test('POST /posts/ calls create() and returns 200', async () => {
		const res = await request(server).post('/posts/').send({
			date: '2022-08-14 13:15:06',
			text: 'sitting here and writing tests',
			image_path: 'no image',
			video_path: 'no video',
			author: 'Marilyn',
			user_id: '1',
		})

		expect(res.status).toBe(200)
	})

	test('GET /posts/ calls index() and returns 200', async () => {
		const res = await request(server).get('/posts/')
		expect(res.status).toBe(200)
	})

	test('GET /posts/:id calls show() and returns 200', async () => {
		const res = await request(server).get('/posts/1')
		expect(res.status).toBe(200)
	})

	test('GET /posts/:id/users calls showPostsByUser() and returns 200', async () => {
		const res = await request(server).get('/posts/1/users')
		expect(res.status).toBe(200)
	})

	test('PUT /posts/:id calls edit() and returns 200', async () => {
		const res = await request(server).put('/posts/2').send({
			field: 'text',
			value: 'new text: still hot!!',
		})
		expect(res.status).toBe(200)
	})

	test('DELETE /posts/:id calls destroy() and returns 200', async () => {
		const res = await request(server).delete('/posts/1')
		expect(res.status).toBe(200)

		await store.closeClient()
	})

	server.close()
})
