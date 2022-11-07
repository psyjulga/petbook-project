// PET MODEL METHODS:
// index => RECEIVE_PETS ✔
// show
// create
// showByUser
// showByProp
// edit
// delete

import { RECEIVE_PETS } from '../actions/pets'
import { Pet } from '../../../backend/src/models/pet'

type PetAction = { type: string; payload: Pet | Pet[] }

export default function pets(state = {}, action: PetAction) {
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
