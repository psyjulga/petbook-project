// // USER MODEL METHODS:
// // index => RECEIVE_USERS ✔
// // show
// // create => ADD_USER ✔
// // authenticate => authedUser.ts ✔
// // addPetToUser
// // removePetFromUser
// // edit => EDIT_USER ✔
// // delete

// addUserImage => EDIT_USER_IMAGE (shared) ✔
// even if the image is added for the first time
// we EDIT the existing post (from null to value)

import { Dispatch } from 'redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { User } from '../../../backend/src/models/user'
import { setAuthedUser } from './authedUser'
import { removeImageFromFrontend } from './helper'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER = 'ADD_USER'
export const EDIT_USER_PICTURE = 'EDIT_USER_PICTURE'
export const EDIT_USER = 'EDIT_USER'

export function receiveUsers(payload: User[]) {
	return {
		type: RECEIVE_USERS, // action.type
		payload, // action.payload
	}
}

export function addUser(payload: User) {
	return {
		type: ADD_USER,
		payload,
	}
}

export function editUserPicture(payload: string, key: number) {
	return {
		type: EDIT_USER_PICTURE,
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

export function handleAddUser(user: User) {
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
				dispatch(addUser(user))
			})
			.then(() => dispatch(hideLoading()))
			.catch((e) => {
				console.log('error in handleAddUser: ', e)
			})
	}
}

// "NEW Picture" => upload a picture
export function handleEditUserPicture(
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
			.then((userWithPicture) => {
				const picture = userWithPicture.profile_pic
				dispatch(editUserPicture(picture, key))
			})
			.then(() => {
				if (editImage)
					// @ts-ignore
					dispatch(removeImageFromFrontend(editImage))
			})
			.catch((e) => {
				console.log('error in handleAddUserPicture: ', e)
			})
	}
}

export function handleEditUser(
	id: number,
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
