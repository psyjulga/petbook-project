// JOIN TABLE users_pets

import { UserPet } from '../../../backend/src/models/user'

export const RECEIVE_USERS_PETS = 'RECEIVE_USERS_PETS'

// is called in shared.ts handleInitialData (with usersPets from db)
// dispatch(receiveUsersPets(usersPets))
// dispatch(action) calls the reducer

export function receiveUsersPets(usersPets: UserPet[]) {
	return {
		type: RECEIVE_USERS_PETS, // action.type
		usersPets, // action.pets
	}
}
