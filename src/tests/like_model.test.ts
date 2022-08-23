import { Like, LikeStore } from '../models/like'

const store = new LikeStore()

const populatedTestLike: Like = {
	// is inserted into the database via the test command
	like_id: 3,
	post_id: '4',
	user_id: '4',
}

const testLikeToAdd: Like = {
	// is inserted during the tests
	post_id: '4',
	user_id: '4',
}

describe('Like Model', () => {
	test('should have an index method', () => {
		expect(store.index).toBeDefined()
	})

	test('should have a showLikesByPost method', () => {
		expect(store.showLikesByPost).toBeDefined()
	})

	test('should have a create method', () => {
		expect(store.create).toBeDefined()
	})

	test('should have a delete method', () => {
		expect(store.delete).toBeDefined()
	})

	test('create method should add a like to the database', async () => {
		const res = await store.create(testLikeToAdd)
		const { like_id, post_id, user_id } = res
		expect(typeof like_id).toBe('number')
		expect(post_id).toBe('4')
		expect(user_id).toBe('4')
	})

	test('index method should return a list of all likes', async () => {
		const res = await store.index()
		expect(res.length).toBeGreaterThanOrEqual(1)
		const findLike = res.find((like) => like.post_id === '4')
		expect(findLike?.user_id).toBe('4')
	})

	test('showLikesByPost method should return all likes of a certain post', async () => {
		const res = await store.showLikesByPost('4')
		expect(res.length).toBeGreaterThanOrEqual(3)
	})

	test('delete method should remove the like from the database and return it', async () => {
		const res = await store.delete('4')
		expect(res.post_id).toBe('4')
		expect(res.user_id).toBe('5')

		await store.closeClient()
	})
})
