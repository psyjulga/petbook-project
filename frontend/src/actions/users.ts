// // USER MODEL METHODS:
// // index => RECEIVE_USERS
// // show
// // create
// // authenticate => authedUser
// // addPetToUser
// // removePetFromUser
// // edit
// // delete

import { Dispatch } from 'redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { User } from '../../../backend/src/models/user'

export const RECEIVE_USERS = 'RECEIVE_USERS'

export function receiveUsers(users: User[]) {
	return {
		type: RECEIVE_USERS, // action.type
		users, // action.users
	}
}

// "handle" => for async
// http requests
// 1. backend server running

export function handleReceiveUsers() {
	return (dispatch: Dispatch) => {
		dispatch(showLoading())

		return fetch('http://localhost:8000/users') // gets data from database
			.then((res) => {
				return res.json()
			})
			.then((users) => {
				dispatch(receiveUsers(users)) // puts data into redux store
			})
			.then(() => dispatch(hideLoading()))
			.catch((e) => {
				console.log('error in handleReceiveUsers: ', e)
			})
	}
}
