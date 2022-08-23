import { Comment, CommentStore } from '../models/comment'

const store = new CommentStore()

const populatedTestComment: Comment = {
	// is inserted into the database via the test command
	comment_id: 4,
	date: '2022-08-23 20:22:54', // ! DATE ! => 2022-08-01T06:10:04.000Z
	text: 'do-not-delete',
	post_id: '4',
	user_id: '4',
}

const testCommentToAdd: Comment = {
	// is inserted during the tests
	date: '2022-08-20 12:31:34',
	text: 'test-comment to add',
	post_id: '4',
	user_id: '4',
}

describe('Comment Model', () => {
	test('should have an index method', () => {
		expect(store.index).toBeDefined()
	})

	test('should have a show method', () => {
		expect(store.show).toBeDefined()
	})

	test('should have a showCommentsByPost method', () => {
		expect(store.showCommentsByPost).toBeDefined()
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

	test('create method should add a comment to the database', async () => {
		const res = await store.create(testCommentToAdd)
		res.date = '2022-08-20 12:31:34'
		const { comment_id, date, text, post_id, user_id } = res

		expect(typeof comment_id).toBe('number')
		expect(date).toBe('2022-08-20 12:31:34')
		expect(text).toBe('test-comment to add')
		expect(post_id).toBe('4')
		expect(user_id).toBe('4')
	})

	test('index method should return a list of all comments', async () => {
		const res = await store.index()
		expect(res.length).toBeGreaterThanOrEqual(1)
		const findComment = res.find(
			(comment) => comment.text === 'test-comment to add'
		)
		expect(findComment).toBeDefined()
	})

	test('show method should return a comment by id', async () => {
		const res = await store.show('4')
		res.date = '2022-08-23 20:22:54'
		expect(res).toEqual(populatedTestComment)
	})

	test('showCommentsByPost method should return all comments of a certain post', async () => {
		const res = await store.showCommentsByPost('4')
		expect(res.length).toBeGreaterThanOrEqual(3)
	})

	test('edit method should edit the text field and return the edited comment', async () => {
		const res = await store.edit('4', 'edited test-comment text')
		res.date = '2022-08-23 20:22:54'
		expect(res).not.toEqual(populatedTestComment)
		expect(res.text).toBe('edited test-comment text')
	})

	test('delete method should remove the comment from the database and return it', async () => {
		const res = await store.delete('5')
		expect(res.text).toEqual('DELETE')

		await store.closeClient()
	})
})
