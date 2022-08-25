// // Comment MODEL METHODS:
// // index
// // show
// // create
// // showByPost
// // edit
// // delete

import { Comment } from '../models/comment'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'

// is called in shared.ts handleInitialData (with comments from db)
// dispatch(receiveComments(comments))
// dispatch(action) calls the reducer

export function receiveComments(comments: Comment[]) {
	return {
		type: RECEIVE_COMMENTS, // action.type
		comments, // action.comments
	}
}
