// // USER MODEL METHODS:
// // index => RECEIVE_USERS ✔
// // show
// // create => ADD_USER ✔
// // authenticate => authedUser.ts ✔
// // addPetToUser
// // removePetFromUser
// // edit => EDIT_USER
// // delete

// addPictureToUser => ADD_USER_PICTURE ✔

import { Dispatch } from 'redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { User } from '../../../backend/src/models/user'
import { setAuthedUser } from './authedUser'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER = 'ADD_USER'
export const ADD_USER_PICTURE = 'ADD_USER_PICTURE'
export const EDIT_USER = 'EDIT_USER'

export function receiveUsers(payload: User[]) {
	return {
		type: RECEIVE_USERS, // action.type
		payload, // action.payload
	}
}

export function addUser(payload: User, numUsers: number) {
	return {
		type: ADD_USER,
		payload,
		numUsers,
	}
}

export function addUserPicture(payload: string, key: number) {
	return {
		type: ADD_USER_PICTURE,
		payload,
		key,
	}
}

export function editUser(payload: User, key: string) {
	return {
		type: EDIT_USER,
		payload,
		key,
	}
}

// "handle" => for async
// returns a function
// => for thunk middleware to apply
// to handle async call
// http requests
// 1. start backend server

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

export function handleAddUser(user: User, numUsers: number) {
	console.log('user in actions handleAddUser: ', user)

	return (dispatch: Dispatch) => {
		dispatch(showLoading())

		return fetch('http://localhost:8000/users', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((res) => {
				return res.json()
			})
			.then((token) => {
				dispatch(setAuthedUser(token, user.user_name))
				dispatch(addUser(user, numUsers))
			})
			.then(() => dispatch(hideLoading()))
			.catch((e) => {
				console.log('error in handleAddUser: ', e)
			})
	}
}

export function handleAddUserPicture(
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
			.then((userWithPicture) => {
				const picture = userWithPicture.profile_pic
				dispatch(addUserPicture(picture, key))
			})
			.then(() => dispatch(hideLoading()))
			.catch((e) => {
				console.log('error in handleAddUserPicture: ', e)
			})
	}
}

export function handleEditUser(
	id: string,
	field: string,
	value: string,
	token: string,
	key: string
) {
	const data = { field, value }

	return (dispatch: Dispatch) => {
		dispatch(showLoading())

		return fetch(`http://localhost:8000/users/${id}`, {
			method: 'PUT',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => {
				return res.json()
			})
			.then((editedUser) => {
				dispatch(editUser(editedUser, key))
			})
			.then(() => dispatch(hideLoading()))
			.catch((e) => {
				console.log('error in handleEditUser: ', e)
			})
	}
}
