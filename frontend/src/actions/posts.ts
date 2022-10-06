// Post MODEL METHODS:
// index => RECEIVE_POSTS ✔
// show
// create => ADD_POST
// showByUser
// edit
// delete

// addPostImage => ADD_POST_IMAGE (shared)

import { Dispatch } from 'redux'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { Post } from '../../../backend/src/models/post'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const ADD_POST_IMAGE = 'ADD_POST_IMAGE'

export function receivePosts(payload: Post[]) {
	return {
		type: RECEIVE_POSTS, // action.type
		payload, // action.payload
	}
}

export function addPost(payload: Post, key: number) {
	return {
		type: ADD_POST,
		payload,
		key,
	}
}

export function addPostImage(payload: string, key: number) {
	return {
		type: ADD_POST_IMAGE,
		payload,
		key,
	}
}

// HANDLE => ASYNC

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

export function handleAddPost(token: string, post: Post, newKey: number) {
	return (dispatch: Dispatch) => {
		dispatch(showLoading())

		return fetch('http://localhost:8000/posts', {
			method: 'POST',
			body: JSON.stringify(post),
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				return res.json()
			})
			.then((newPost) => {
				dispatch(addPost(newPost, newKey))
			})
			.then(() => dispatch(hideLoading()))
			.catch((e) => {
				console.log('error in handleAddPost: ', e)
			})
	}
}

export function handleAddPostImage(
	id: string,
	formData: FormData,
	key: number
) {
	return (dispatch: Dispatch) => {
		dispatch(showLoading())

		return fetch(`http://localhost:8000/shared/${id}`, {
			method: 'POST',
			body: formData,
		})
			.then((res) => {
				return res.json()
			})
			.then((postWithImage) => {
				const image = postWithImage.image
				dispatch(addPostImage(image, key))
			})
			.then(() => dispatch(hideLoading()))
			.catch((e) => {
				console.log('error in handleAddPostImage: ', e)
			})
	}
}
