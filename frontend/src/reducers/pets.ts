// PET MODEL METHODS:
// index => RECEIVE_PETS ✔
// show
// create
// showByUser
// showByProp
// edit => EDIT_PET
// delete

import { EDIT_PET, RECEIVE_PETS } from '../actions/pets'
import { Pet } from '../../../backend/src/models/pet'

type PetAction = { type: string; payload: Pet | Pet[]; key: string }

export default function pets(state = {}, action: PetAction) {
	switch (action.type) {
		case RECEIVE_PETS: {
			return {
				...state,
				...action.payload,
			}
		}

		case EDIT_PET: {
			const { payload, key } = action

			return {
				...state,
				[key]: payload, // edited pet
			}
		}

		default:
			return state
	}
}
