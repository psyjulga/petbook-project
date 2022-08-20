import { Comment, CommentStore } from '../models/comment'

const store = new CommentStore()

const populatedTestComment: Comment = {
	// is inserted into the database via the test command
	comment_id: 1,
	date: '2022-08-01 08:10:04', // ! DATE ! => 2022-08-01T06:10:04.000Z
	text: 'absolutely - even now in the morning, my rabbit is hiding in the shadow',
	post_id: '2',
	user_id: '2',
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
		const testCommentToAdd: Comment = {
			date: '2022-08-20 12:31:34',
			text: 'well done, rabbit!',
			post_id: '1',
			user_id: '1',
		}

		const res = await store.create(testCommentToAdd)
		res.date = '2022-08-20 12:31:34'
		const { comment_id, date, text, post_id, user_id } = res

		expect(typeof comment_id).toBe('number')
		expect(date).toBe('2022-08-20 12:31:34')
		expect(text).toBe('well done, rabbit!')
		expect(post_id).toBe('1')
		expect(user_id).toBe('1')
	})

	test('index method should return a list of all comments', async () => {
		const res = await store.index()
		res[0].date = '2022-08-01 08:10:04'
		expect(res.length).toBeGreaterThanOrEqual(1)
		expect(res[0]).toEqual(populatedTestComment)
	})

	test('show method should return a comment by id', async () => {
		const res = await store.show('1')
		res.date = '2022-08-01 08:10:04'
		expect(res).toEqual(populatedTestComment)
	})

	test('showCommentsByPost method should return all comments of a certain post', async () => {
		const res = await store.showCommentsByPost('2')
		res[0].date = '2022-08-01 08:10:04'
		expect(res[0]).toEqual(populatedTestComment)
	})

	test('edit method should edit the text field and return the edited comment', async () => {
		const res = await store.edit('1', 'edited comment text')
		expect(res).not.toEqual(populatedTestComment)
		expect(res.text).toBe('edited comment text')
	})

	test('delete method should remove the comment from the database and return it', async () => {
		const res = await store.delete('1')
		res.date = '2022-08-01 08:10:04'
		populatedTestComment.text = 'edited comment text'
		expect(res).toEqual(populatedTestComment)

		await store.closeClient()
	})
})
