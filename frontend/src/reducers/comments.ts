// Comment MODEL METHODS:
// index => RECEIVE_COMMENTS ✔
// show
// create => ADD_COMMENT
// showByPost
// edit
// delete

// REDUCER => updates the store
// is triggered with store.dispatch(action)

import { RECEIVE_COMMENTS, ADD_COMMENT } from '../actions/comments'

import { Comment } from '../../../backend/src/models/comment'

// use UNIONS
type CommentAction = { type: string; payload: Comment[] } // !!

export default function comments(state = {}, action: any) {
	// is put into "combined reducer"
	// and loaded into the store
	// one single state object:
	// => {users, pets, posts, ..}
	switch (action.type) {
		case RECEIVE_COMMENTS: {
			const { payload } = action // Comment[]

			const arrWithNumericIds: Comment[] = payload.map((comment: Comment) => {
				const newId = Number(comment.comment_id)

				return { ...comment, comment_id: newId }
			})

			return {
				...arrWithNumericIds,
			}
		}

		case ADD_COMMENT: {
			const { payload, key } = action

			return {
				...state,
				[key]: payload, // comment
			}
		}

		default:
			return state
	}
}
