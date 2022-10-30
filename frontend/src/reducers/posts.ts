// Post MODEL METHODS:
// index => RECEIVE_POSTS ✔
// show
// create => ADD_POST ✔
// showByUser
// edit
// delete => DELETE_POST

// addPostImage => ADD_POST_IMAGE (shared) ✔

// REDUCER => updates the store
// is triggered with store.dispatch(action)

import {
	RECEIVE_POSTS,
	ADD_POST,
	ADD_POST_IMAGE,
	DELETE_POST,
} from '../actions/posts'

import { Post } from '../../../backend/src/models/post'

function postImage(state = {}, action: any) {
	const { payload } = action
	return {
		...state,
		['image']: payload,
	}
}

// use UNIONS ??? => ANY !!!
type PostAction = { type: string; payload: Post | Post[] | string }

export default function posts(state = {}, action: any) {
	// is put into "combined reducer"
	// and loaded into the store
	// one single state object:
	// => {users, pets, posts, ..}
	switch (action.type) {
		case RECEIVE_POSTS: {
			return {
				...state,
				...action.payload, // posts
			}
		}

		case ADD_POST: {
			const { payload, key } = action

			return {
				...state,
				[key]: payload, // post
			}
		}

		case ADD_POST_IMAGE: {
			const { key } = action

			return {
				...state,
				// @ts-ignore
				[key]: postImage(state[key], action),
			}
		}

		case DELETE_POST: {
			const { payload } = action // id

			const copiedState = { ...state } // copies current state
			const stateArr: Post[] = Object.values(copiedState)
			const newState = stateArr.filter((post: Post) => post.post_id !== payload)

			return {
				...newState,
			}
		}

		default:
			return state
	}
}
