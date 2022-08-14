import request from 'supertest'
import app from '../server'
import { Server } from 'http'
import { CommentStore } from '../models/comment'

const store = new CommentStore()
let server: Server

describe('Comment Handler', () => {
	server = app.listen()

	test('POST /comments/ calls create() and returns 200', async () => {
		const res = await request(server).post('/comments/').send({
			date: '2022-04-24 12:00:08',
			text: 'well done my friend',
			user_id: '1',
			post_id: '1',
		})

		expect(res.status).toBe(200)
	})

	test('GET /comments/ calls index() and returns 200', async () => {
		const res = await request(server).get('/comments/')
		expect(res.status).toBe(200)
	})

	test('GET /comments/:id calls show() and returns 200', async () => {
		const res = await request(server).get('/comments/1')
		expect(res.status).toBe(200)
	})

	test('GET /comments/:id/posts calls showCommentsByPost() and returns 200', async () => {
		const res = await request(server).get('/comments/2/posts')
		expect(res.status).toBe(200)
	})

	test('PUT /comments/:id calls edit() and returns 200', async () => {
		const res = await request(server).put('/comments/2').send({
			value: 'new text',
		})
		expect(res.status).toBe(200)
	})

	test('DELETE /comments/:id calls destroy() and returns 200', async () => {
		const res = await request(server).delete('/comments/2')
		expect(res.status).toBe(200)

		await store.closeClient()
	})

	server.close()
})
