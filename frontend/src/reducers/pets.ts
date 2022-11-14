// PET MODEL METHODS:
// index => RECEIVE_PETS ✔
// show
// create
// showByUser
// showByProp
// edit => EDIT_PET ✔
// delete

// addPictureToPet => ADD_PET_PICTURE

import { EDIT_PET, RECEIVE_PETS, ADD_PET_PICTURE } from '../actions/pets'
import { Pet } from '../../../backend/src/models/pet'

type PetAction = { type: string; payload: Pet | Pet[]; key: string | number }

function profilePic(state = {}, action: PetAction) {
	const { payload } = action
	return {
		...state,
		['profile_pic']: payload, // image path string
	}
}

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

		case ADD_PET_PICTURE: {
			const { key } = action

			return {
				...state,
				// @ts-ignore
				[key]: profilePic(state[key], action),
			}
		}

		default:
			return state
	}
}
