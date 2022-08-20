import { Like, LikeStore } from '../models/like'

const store = new LikeStore()

const populatedTestLike: Like = {
	// is inserted into the database via the test command
	like_id: 1,
	post_id: '1',
	user_id: '1',
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
		const testLikeToAdd: Like = {
			post_id: '2',
			user_id: '2',
		}

		const res = await store.create(testLikeToAdd)
		const { like_id, post_id, user_id } = res

		expect(typeof like_id).toBe('number')
		expect(post_id).toBe('2')
		expect(user_id).toBe('2')
	})

	test('index method should return a list of all likes', async () => {
		const res = await store.index()

		expect(res.length).toBeGreaterThanOrEqual(1)
		expect(res[0]).toEqual(populatedTestLike)
	})

	test('showLikesByPost method should return all likes of a certain post', async () => {
		const res = await store.showLikesByPost('1')
		expect(res).toEqual([populatedTestLike])
	})

	test('delete method should remove the like from the database', async () => {
		const res = await store.delete('1')
		expect(res).toEqual(populatedTestLike)

		await store.closeClient()
	})
})
