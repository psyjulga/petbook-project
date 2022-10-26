// PET MODEL METHODS:
// index => RECEIVE_PETS
// show
// create
// showByUser
// showByProp
// edit
// delete

// REDUCER => update the store
// is triggered with store.dispatch(action)

import { RECEIVE_PETS } from '../actions/pets'

import { Pet } from '../../../backend/src/models/pet'

// use UNIONS
type PetAction = { type: string; payload: Pet[] }

export default function pets(state = {}, action: PetAction) {
	// is put into "combined reducer"
	// and loaded into the store
	// one single state object:
	// => {users, pets, posts, ..}
	switch (action.type) {
		case RECEIVE_PETS: {
			return {
				...state,
				...action.payload,
			}
		}

		default:
			return state
	}
}
