import { Post, PostStore } from '../models/post'

const store = new PostStore()

const populatedTestpost: Post = {
	// is inserted into the database via the test command
	post_id: 1,
	date: '2022-04-18 12:18:15', // ! DATE !
	text: 'Successfully delivered all easter eggs',
	image: null,
	video: null,
	author: 'Anton',
	user_id: '2',
}

describe('Post Model', () => {
	test('should have an index method', () => {
		expect(store.index).toBeDefined()
	})

	test('should have a show method', () => {
		expect(store.show).toBeDefined()
	})

	test('should have a showPostsByUser method', () => {
		expect(store.showPostsByUser).toBeDefined()
	})

	test('should have a create method', () => {
		expect(store.create).toBeDefined()
	})

	test('should have an edit method', () => {
		expect(store.edit).toBeDefined()
	})

	test('should have a delete method', () => {
		expect(store.delete).toBeDefined()
	})

	test('create method should add a post to the database', async () => {
		const testPostToAdd: Post = {
			date: '2022-08-19 11:41:34',
			text: 'donkeys are the best',
			author: 'Fluffy',
			user_id: '2',
		}

		const res = await store.create(testPostToAdd)
		res.date = '2022-08-19 11:41:34'
		const { post_id, date, text, author, user_id } = res

		expect(typeof post_id).toBe('number')
		expect(date).toBe('2022-08-19 11:41:34')
		expect(text).toBe('donkeys are the best')
		expect(author).toBe('Fluffy')
		expect(user_id).toBe('2')
	})

	test('index method should return a list of all posts', async () => {
		const res = await store.index()
		res[0].date = '2022-04-18 12:18:15'
		expect(res.length).toBeGreaterThanOrEqual(1)
		expect(res[0]).toEqual(populatedTestpost)
	})

	test('show method should return a post by id', async () => {
		const res = await store.show('1')
		res.date = '2022-04-18 12:18:15'
		expect(res).toEqual(populatedTestpost)
	})

	test('showPostsByUser method should return all posts of a certain user', async () => {
		const res = await store.showPostsByUser('2')
		res[0].date = '2022-04-18 12:18:15'
		expect(res[0]).toEqual(populatedTestpost)
	})

	test('edit method should edit the text or author field and return the edited post', async () => {
		const res = await store.edit('1', 'text', 'edited post text')
		expect(res).not.toEqual(populatedTestpost)
		expect(res.text).toBe('edited post text')
	})

	test('delete method should remove the post from the database and return it', async () => {
		const res = await store.delete('1')
		res.date = '2022-04-18 12:18:15'
		populatedTestpost.text = 'edited post text'
		expect(res).toEqual(populatedTestpost)

		await store.closeClient()
	})
})
