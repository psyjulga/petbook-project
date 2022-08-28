// Post MODEL METHODS:
// index => RECEIVE_POSTS
// show
// create
// showByUser
// edit
// delete

import { Dispatch } from 'redux'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { Post } from '../../../backend/src/models/post'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function receivePosts(posts: Post[]) {
	return {
		type: RECEIVE_POSTS, // action.type
		posts, // action.posts
	}
}

export function handleReceivePosts(token: string) {
	return (dispatch: Dispatch) => {
		dispatch(showLoading())

		return fetch('http://localhost:8000/posts', {
			// send token for accessing protected routes
			headers: {
				authorization: `Bearer ${token}`,
			},
		}) // gets data from database
			.then((res) => {
				if (res.status === 403) {
					throw new Error('no access to posts - protected route')
				}
				return res.json()
			})
			.then((posts) => {
				dispatch(receivePosts(posts)) // puts data into redux store
			})
			.then(() => dispatch(hideLoading()))
			.catch((e) => {
				console.log('error in handleReceivePosts: ', e)
			})
	}
}
