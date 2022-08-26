// // USER MODEL METHODS:
// // index
// // show
// // create
// // authenticate
// // addPetToUser
// // removePetFromUser
// // edit
// // delete

import { Dispatch } from 'redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { User } from '../../../backend/src/models/user'

export const RECEIVE_USERS = 'RECEIVE_USERS'
// export const UPDATE_USERS_ANSWERS = 'UPDATE_USERS_ANSWERS'
// export const UPDATE_USERS_QUESTIONS = 'UPDATE_USERS_QUESTIONS'

// is called in shared.ts handleInitialData (with users from db)
// dispatch(receiveUsers(users))
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
