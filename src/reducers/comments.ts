// // Comment MODEL METHODS:
// // index
// // show
// // create
// // showByPost
// // edit
// // delete

// REDUCER => update the store
// is triggered with store.dispatch(action)

import { RECEIVE_COMMENTS } from '../actions/comments'

import { Comment } from '../models/comment'

// use UNIONS
type CommentAction = { type: string; comments: Comment[] }

export default function comments(state = {}, action: CommentAction) {
	// is put into "combined reducer"
	// and loaded into the store
	// one single state object:
	// => {users, pets, posts, ..}
	switch (action.type) {
		case RECEIVE_COMMENTS: {
			return {
				...state,
				...action.comments,
			}
		}

		default:
			return state
	}
}
