// // LIKE MODEL METHODS
// // index
// // showByPost
// // create
// // delete

// REDUCER => update the store
// is triggered with store.dispatch(action)

import { RECEIVE_LIKES } from '../actions/likes'

import { Like } from '../../../backend/src/models/like'

// use UNIONS
type LikeAction = { type: string; likes: Like[] }

export default function likes(state = {}, action: LikeAction) {
	// is put into "combined reducer"
	// and loaded into the store
	// one single state object:
	// => {users, pets, posts, ..}
	switch (action.type) {
		case RECEIVE_LIKES: {
			return {
				...state,
				...action.likes,
			}
		}

		default:
			return state
	}
}
