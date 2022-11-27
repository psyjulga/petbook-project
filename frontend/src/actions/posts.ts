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

import { Dispatch } from 'redux'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { Post } from '../../../backend/src/models/post'
import { removeImageFromFrontend } from './helper'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST_IMAGE = 'ADD_POST_IMAGE'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'

export function receivePosts(payload: Post[]) {
	return {
		type: RECEIVE_POSTS, // action.type
		payload, // action.payload
	}
}

export function addPost(payload: Post) {
	return {
		type: ADD_POST,
		payload,
	}
}

export function editPostImage(payload: string, key: number) {
	return {
		type: EDIT_POST_IMAGE,
		payload,
		key,
	}
}

export function deletePost(id: number) {
	return {
		type: DELETE_POST,
		id,
	}
}

export function editPost(payload: Post, key: number) {
	return {
		type: EDIT_POST,
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

export function handleAddPost(token: string, post: Post) {
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
				dispatch(addPost(newPost))
			})
			.then(() => dispatch(hideLoading()))
			.catch((e) => {
				console.log('error in handleAddPost: ', e)
			})
	}
}

// "NEW Picture" => upload a picture
export function handleEditPostImage(
	id: string,
	formData: FormData,
	key: number,
	editImage: string | null
	// string => "edit picture" => old image has to be removed in frontend
	// null => "add picture"
) {
	return (dispatch: Dispatch) => {
		return fetch(`http://localhost:8000/shared/${id}`, {
			method: 'POST',
			body: formData,
		})
			.then((res) => {
				return res.json()
			})
			.then((postWithImage) => {
				const image = postWithImage.image
				dispatch(editPostImage(image, key))
			})
			.then(() => {
				if (editImage)
					// @ts-ignore
					dispatch(removeImageFromFrontend(editImage))
			})
			.catch((e) => {
				console.log('error in handleAddPostImage: ', e)
			})
	}
}

export function handleDeletePost(token: string, id: number) {
	return (dispatch: Dispatch) => {
		dispatch(showLoading())

		return fetch(`http://localhost:8000/posts/${id}`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
			.then((res) => {
				if (res.status === 403) {
					throw new Error('no access to posts - protected route')
				}
				return res.json()
			})
			.then((deletedPost: Post) => {
				if (deletedPost.image)
					// @ts-ignore
					dispatch(removeImageFromFrontend(deletedPost.image))
			})
			.then(() => dispatch(deletePost(id)))
			.then(() => dispatch(hideLoading()))
			.catch((e) => {
				console.log('error in deletePost: ', e)
			})
	}
}

// edit post title, text, image
// IMAGE => use case => DELETE PCTURE
// -------- => remove image in frontend
// -------- => set post image to NULL in DB
export function handleEditPost(
	id: number,
	field: string,
	value: string | null, // null => to delete image
	token: string,
	key: number,
	image?: string
	// image only when a picture gets deleted
	// delete old in frontend, set to null in DB
) {
	const data = { field, value }

	return (dispatch: Dispatch) => {
		dispatch(showLoading())

		return fetch(`http://localhost:8000/posts/${id}`, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				if (res.status === 403) {
					throw new Error('no access to posts - protected route')
				}
				return res.json()
			})
			.then((editedPost) => {
				console.log('EDITED POST: ', editedPost)
				dispatch(editPost(editedPost, key))
				// @ts-ignore
				if (field === 'image') dispatch(removeImageFromFrontend(image))
			})
			.then(() => dispatch(hideLoading()))
			.catch((e) => {
				console.log('error in editPost: ', e)
			})
	}
}
