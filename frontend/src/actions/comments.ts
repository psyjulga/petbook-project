// Comment MODEL METHODS:
// index => RECEIVE_COMMENTS ✔
// show
// create => ADD_COMMENT
// showByPost
// edit
// delete

import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { Dispatch } from 'redux'
import { Comment } from '../../../backend/src/models/comment'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'

// dispatch(receiveComments(comments))
// dispatch(action) calls the reducer

export function receiveComments(payload: Comment[]) {
	return {
		type: RECEIVE_COMMENTS, // action.type
		payload, // action.payload
	}
}

export function addComment(payload: Comment, key: number) {
	return {
		type: ADD_COMMENT, // action.type
		payload, // action.payload
		key,
	}
}

// HANDLE => ASYNC

export function handleReceiveComments(token: string) {
	return (dispatch: Dispatch) => {
		dispatch(showLoading())

		return fetch('http://localhost:8000/comments', {
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
			.then((comments) => {
				dispatch(receiveComments(comments)) // puts data into redux store
			})
			.then(() => dispatch(hideLoading()))
			.catch((e) => {
				console.log('error in handleReceiveComments: ', e)
			})
	}
}

// handleAddComment(token, date, commentText, userID, postID, newCommentKey)
export function handleAddComment(
	token: string,
	date: string,
	text: string,
	user_id: string,
	post_id: string,
	newKey: number
) {
	return (dispatch: Dispatch) => {
		dispatch(showLoading())

		const commentData = {
			date,
			text,
			post_id,
			user_id,
		}

		return fetch('http://localhost:8000/comments', {
			method: 'POST',
			body: JSON.stringify(commentData),
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				return res.json()
			})
			.then((newComment) => {
				dispatch(addComment(newComment, newKey))
			})
			.then(() => dispatch(hideLoading()))
			.catch((e) => {
				console.log('error in handleAddComment: ', e)
			})
	}
}
