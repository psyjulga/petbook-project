// Post MODEL METHODS:
// index => RECEIVE_POSTS ✔
// show (by ID)
// create => ADD_POST ✔
// showByUser
// edit => EDIT_POST ✔
// delete => DELETE_POST ✔

// addPostImage => EDIT_POST_IMAGE (shared) ✔
// even if the image is added for the first time
// we EDIT the existing post (from null to value)

import {
	RECEIVE_POSTS,
	ADD_POST,
	EDIT_POST_IMAGE,
	DELETE_POST,
	EDIT_POST,
} from '../actions/posts'

import { Post } from '../../../backend/src/models/post'

import { StoreObject } from '../util/types'

type PostAction = {
	type: string
	payload: Post | Post[]
	key: string | number
	id: number
}

function postImage(state: StoreObject, action: PostAction) {
	const { payload } = action
	return {
		...state,
		['image']: payload,
	}
}

export default function posts(state = {}, action: PostAction) {
	switch (action.type) {
		case RECEIVE_POSTS: {
			return {
				...state,
				...action.payload, // Post[]
			}
		}

		case ADD_POST: {
			const { payload } = action // Post
			const copiedState = { ...state }
			const stateArr: Post[] = Object.values(copiedState)
			stateArr.push(payload as Post)

			return {
				...stateArr,
			}
		}

		case EDIT_POST_IMAGE: {
			const { key } = action

			return {
				...state,
				// @ts-ignore
				[key]: postImage(state[key], action),
			}
		}

		case DELETE_POST: {
			const { id } = action // id

			const copiedState = { ...state } // copies current state
			const stateArr: Post[] = Object.values(copiedState)
			const newState = stateArr.filter((post: Post) => post.post_id !== id)

			return {
				...newState,
			}
		}

		case EDIT_POST: {
			const { payload, key } = action // editedPost
			const newState = { ...state, [key]: payload }
			return newState
		}

		default:
			return state
	}
}
