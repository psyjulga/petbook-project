// PET MODEL METHODS:
// index => RECEIVE_PETS ✔
// show
// create
// showByUser
// showByProp
// edit => EDIT_PET ✔
// delete

// addPictureToPet => ADD_PET_PICTURE

import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { Dispatch } from 'redux'
import { Pet } from '../../../backend/src/models/pet'

export const RECEIVE_PETS = 'RECEIVE_PETS'
export const EDIT_PET = 'EDIT_PET'
export const ADD_PET_PICTURE = 'ADD_PET_PICTURE'

export function receivePets(payload: Pet[]) {
	return {
		type: RECEIVE_PETS, // action.type
		payload, // action.payload
	}
}

export function editPet(payload: Pet, key: string) {
	return {
		type: EDIT_PET,
		payload,
		key,
	}
}
export function addPetPicture(payload: string, key: number) {
	return {
		type: ADD_PET_PICTURE,
		payload,
		key,
	}
}

// ASYNC

export function handleReceivePets(token: string) {
	return (dispatch: Dispatch) => {
		dispatch(showLoading())

		return fetch('http://localhost:8000/pets', {
			// send token for accessing protected routes
			headers: {
				authorization: `Bearer ${token}`,
			},
		}) // gets data from database
			.then((res) => {
				if (res.status === 403) {
					throw new Error('no access to pets - protected route')
				}
				return res.json()
			})
			.then((pets) => {
				dispatch(receivePets(pets)) // puts data into redux store
			})
			.then(() => dispatch(hideLoading()))
			.catch((e) => {
				console.log('error in handleReceivePets: ', e)
			})
	}
}

export function handleEditPet(
	id: number,
	field: string,
	value: string,
	token: string,
	key: string
) {
	const data = { field, value }

	return (dispatch: Dispatch) => {
		dispatch(showLoading())

		return fetch(`http://localhost:8000/pets/${id}`, {
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
			.then((editedPet) => {
				dispatch(editPet(editedPet, key))
			})
			.then(() => dispatch(hideLoading()))
			.catch((e) => {
				console.log('error in handleEditPet: ', e)
			})
	}
}

export function handleAddPetPicture(
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
			.then((petWithPicture) => {
				const picture = petWithPicture.profile_pic
				dispatch(addPetPicture(picture, key))
			})
			.then(() => dispatch(hideLoading()))
			.catch((e) => {
				console.log('error in handleAddPetPicture: ', e)
			})
	}
}
