// Comment MODEL METHODS:
// index => RECEIVE_COMMENTS
// show
// create
// showByPost
// edit
// delete

// REDUCER => updates the store
// is triggered with store.dispatch(action)

import { RECEIVE_COMMENTS } from '../actions/comments'

import { Comment } from '../../../backend/src/models/comment'

// use UNIONS
type CommentAction = { type: string; payload: Comment[] }

export default function comments(state = {}, action: CommentAction) {
	// is put into "combined reducer"
	// and loaded into the store
	// one single state object:
	// => {users, pets, posts, ..}
	switch (action.type) {
		case RECEIVE_COMMENTS: {
			return {
				...state,
				...action.payload,
			}
		}

		default:
			return state
	}
}
