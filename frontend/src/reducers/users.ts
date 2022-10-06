// USER MODEL METHODS:
// index => RECEIVE_USERS ✔
// show
// create => NEW_USER ✔
// authenticate => authedUser.ts ✔
// addPetToUser
// removePetFromUser
// edit => EDIT_USER
// delete

// addUserPicture => ADD_USER_PICTURE ✔

// REDUCER => updates the store

import {
	RECEIVE_USERS,
	ADD_USER,
	ADD_USER_PICTURE,
	EDIT_USER,
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

function profilePic(state = {}, action: any) {
	const { payload } = action
	return {
		...state,
		['profile_pic']: payload,
	}
}

// function userQuestion(state = {}, action) {
// 	const { id } = action
// 	const { questions } = state

// 	return {
// 		...state,
// 		questions: questions.concat(id),
// 	}
// }

// use UNIONS
type UserAction = { type: string; payload: User | User[] | string } // ??? !!! ???

export default function users(state = {}, action: any) {
	// is put into "combined reducer"
	// and loaded into the store
	// one single state object:
	// => {users, pets, posts, ..}
	switch (action.type) {
		case RECEIVE_USERS: {
			return {
				...state,
				...action.payload, // users
			}
		}

		case ADD_USER: {
			const { payload, key } = action

			return {
				...state,
				[key]: payload, // user
			}
		}

		case ADD_USER_PICTURE: {
			const { key } = action

			return {
				...state,
				// @ts-ignore
				[key]: profilePic(state[key], action),
			}
		}

		case EDIT_USER: {
			const { payload, key } = action

			return {
				...state,
				[key]: payload, // edited user
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
