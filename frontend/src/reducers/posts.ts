// // Post MODEL METHODS:
// // index
// // show
// // create
// // showByUser
// // edit
// // delete

// REDUCER => update the store
// is triggered with store.dispatch(action)

import { RECEIVE_POSTS } from '../actions/posts'

import { Post } from '../models/post'

// use UNIONS
type PostAction = { type: string; posts: Post[] }

export default function posts(state = {}, action: PostAction) {
	// is put into "combined reducer"
	// and loaded into the store
	// one single state object:
	// => {users, pets, posts, ..}
	switch (action.type) {
		case RECEIVE_POSTS: {
			return {
				...state,
				...action.posts,
			}
		}

		default:
			return state
	}
}
