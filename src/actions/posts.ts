// // Post MODEL METHODS:
// // index
// // show
// // create
// // showByUser
// // edit
// // delete

import { Post } from '../models/post'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'

// is called in shared.ts handleInitialData (with posts from db)
// dispatch(receivePosts(posts))
// dispatch(action) calls the reducer

export function receivePosts(posts: Post[]) {
	return {
		type: RECEIVE_POSTS, // action.type
		posts, // action.posts
	}
}
