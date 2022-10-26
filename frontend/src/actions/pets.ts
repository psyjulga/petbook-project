// PET MODEL METHODS:
// index => RECEIVE_PETS
// show
// create
// showByUser
// showByProp
// edit
// delete

import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { Dispatch } from 'redux'
import { Pet } from '../../../backend/src/models/pet'

export const RECEIVE_PETS = 'RECEIVE_PETS'

export function receivePets(payload: Pet[]) {
	return {
		type: RECEIVE_PETS, // action.type
		payload, // action.payload
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
