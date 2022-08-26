// // USER MODEL METHODS:
// // index => RECEIVE_USERS
// // show
// // create
// // authenticate
// // addPetToUser
// // removePetFromUser
// // edit
// // delete

// REDUCER => update the store

import {
	RECEIVE_USERS,
	// UPDATE_USERS_ANSWERS,
	// UPDATE_USERS_QUESTIONS,
} from '../actions/users'
import { User } from '../../../backend/src/models/user'

// function userAnswer(state = {}, action) {
// 	const { qid, answer } = action
// 	const { answers } = state

// 	return {
// 		...state,
// 		answers: {
// 			...answers,
// 			[qid]: answer,
// 		},
// 	}
// }

// function userQuestion(state = {}, action) {
// 	const { id } = action
// 	const { questions } = state

// 	return {
// 		...state,
// 		questions: questions.concat(id),
// 	}
// }

// use UNIONS
type UserAction = { type: string; users: User[] }

export default function users(state = {}, action: UserAction) {
	// is put into "combined reducer"
	// and loaded into the store
	// one single state object:
	// => {users, pets, posts, ..}
	switch (action.type) {
		case RECEIVE_USERS: {
			return {
				...state,
				...action.users,
			}
		}

		// case UPDATE_USERS_ANSWERS: {
		// 	const { authedUser } = action

		// 	return {
		// 		...state,
		// 		[authedUser]: userAnswer(state[authedUser], action),
		// 	}
		// }

		// case UPDATE_USERS_QUESTIONS: {
		// 	const { authedUser } = action

		// 	return {
		// 		...state,
		// 		[authedUser]: userQuestion(state[authedUser], action),
		// 	}
		// }

		default:
			return state
	}
}
