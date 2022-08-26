// // PET MODEL METHODS:
// // index
// // show
// // create
// // showByUser
// // showByProp
// // edit
// // delete

import { Pet } from '../../../backend/src/models/pet'

export const RECEIVE_PETS = 'RECEIVE_PETS'

// is called in shared.ts handleInitialData (with pets from db)
// dispatch(receivePets(pets))
// dispatch(action) calls the reducer

export function receivePets(pets: Pet[]) {
	return {
		type: RECEIVE_PETS, // action.type
		pets, // action.pets
	}
}
