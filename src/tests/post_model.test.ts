import { Post, PostStore } from '../models/post'

const store = new PostStore()

const populatedTestPost: Post = {
	// is inserted into the database via the test command
	post_id: 3,
	date: '2022-08-23 18:42:25', // ! DATE !
	text: 'test-post',
	image: null,
	video: null,
	author: 'test-user',
	user_id: '3',
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
			author: 'do-not-delete',
			user_id: '4',
		}

		const res = await store.create(testPostToAdd)
		res.date = '2022-08-19 11:41:34'
		const { post_id, date, text, author, user_id } = res

		expect(typeof post_id).toBe('number')
		expect(date).toBe('2022-08-19 11:41:34')
		expect(text).toBe('donkeys are the best')
		expect(author).toBe('do-not-delete')
		expect(user_id).toBe('4')
	})

	test('index method should return a list of all posts', async () => {
		const res = await store.index()
		expect(res.length).toBeGreaterThanOrEqual(1)
		const findPost = res.find((post) => post.text === 'donkeys are the best')
		expect(findPost?.user_id).toBe('4')
	})

	test('show method should return a post by id', async () => {
		const res = await store.show('3')
		res.date = '2022-08-23 18:42:25'
		expect(res).toEqual(populatedTestPost)
	})

	test('showPostsByUser method should return all posts of a certain user', async () => {
		const res = await store.showPostsByUser('3')
		res[0].date = '2022-08-23 18:42:25'
		expect(res[0]).toEqual(populatedTestPost)
	})

	test('edit method should edit the text or author field and return the edited post', async () => {
		const res = await store.edit('3', 'text', 'edited test-post text')
		expect(res.text).not.toBe('test-post')
		expect(res.text).toBe('edited test-post text')
	})

	test('delete method should remove the post from the database and return it', async () => {
		const res = await store.delete('3')
		res.date = '2022-08-23 18:42:25'
		populatedTestPost.text = 'edited test-post text'
		expect(res).toEqual(populatedTestPost)

		await store.closeClient()
	})
})
