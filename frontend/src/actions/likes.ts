// // LIKE MODEL METHODS
// // index
// // showByPost
// // create
// // delete

import { Like } from '../../../backend/src/models/like'

export const RECEIVE_LIKES = 'RECEIVE_LIKES'

// is called in shared.ts handleInitialData (with likes from db)
// dispatch(receiveLikes(likes))
// dispatch(action) calls the reducer

export function receiveLikes(likes: Like[]) {
	return {
		type: RECEIVE_LIKES, // action.type
		likes, // action.likes
	}
}
