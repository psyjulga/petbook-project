// USER MODEL METHODS:
// index => RECEIVE_USERS ✔
// show
// create => NEW_USER ✔
// authenticate => authedUser.ts ✔
// addPetToUser
// removePetFromUser
// edit => EDIT_USER ✔
// delete

// addUserPicture => EDIT_USER_PICTURE ✔

import {
	RECEIVE_USERS,
	ADD_USER,
	EDIT_USER_PICTURE,
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

type UserAction = { type: string; payload: User | User[]; key: string | number }

function profilePic(state = {}, action: UserAction) {
	const { payload } = action
	return {
		...state,
		['profile_pic']: payload,
	}
}

export default function users(state = {}, action: UserAction) {
	// is put into "combined reducer"
	// and loaded into the store
	// one single state object:
	// => {users, pets, posts, ..}
	switch (action.type) {
		case RECEIVE_USERS: {
			return {
				...state,
				...action.payload, // User[]
			}
		}

		case ADD_USER: {
			const { payload } = action // User
			const copiedState = { ...state }
			const stateArr: User[] = Object.values(copiedState)
			stateArr.push(payload as User)

			return { ...stateArr }
		}

		case EDIT_USER_PICTURE: {
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

		default:
			return state
	}
}
