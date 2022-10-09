// Comment MODEL METHODS:
// index => RECEIVE_COMMENTS
// show
// create
// showByPost
// edit
// delete

import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { Dispatch } from 'redux'
import { Comment } from '../../../backend/src/models/comment'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'

// dispatch(receiveComments(comments))
// dispatch(action) calls the reducer

export function receiveComments(payload: Comment[]) {
	return {
		type: RECEIVE_COMMENTS, // action.type
		payload, // action.payload
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
