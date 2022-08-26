// REDUCER => update the store
// is triggered with store.dispatch(action)

import { RECEIVE_USERS_PETS } from '../actions/usersPets'

import { UserPet } from '../../../backend/src/models/user'

// use UNIONS
type UserPetAction = { type: string; usersPets: UserPet[] }

export default function usersPets(state = {}, action: UserPetAction) {
	// is put into "combined reducer"
	// and loaded into the store
	// one single state object:
	// => {users, pets, posts, ..}
	switch (action.type) {
		case RECEIVE_USERS_PETS: {
			return {
				...state,
				...action.usersPets,
			}
		}

		default:
			return state
	}
}
