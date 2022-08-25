// // USER MODEL METHODS:
// // index
// // show
// // create
// // authenticate
// // addPetToUser
// // removePetFromUser
// // edit
// // delete

import { User } from '../models/user'

export const RECEIVE_USERS = 'RECEIVE_USERS'
// export const UPDATE_USERS_ANSWERS = 'UPDATE_USERS_ANSWERS'
// export const UPDATE_USERS_QUESTIONS = 'UPDATE_USERS_QUESTIONS'

// is called in shared.ts handleInitialData (with users from db)
// dispatch(receiveUsers(users))
export function receiveUsers(users: User[]) {
	return {
		type: RECEIVE_USERS, // action.type
		users, // action.users
	}
}

// export function updateUsersAnswers({ authedUser, qid, answer }) {
// 	return {
// 		type: UPDATE_USERS_ANSWERS,
// 		authedUser,
// 		qid,
// 		answer,
// 	}
// }

// export function updateUsersQuestions(question) {
// 	return {
// 		type: UPDATE_USERS_QUESTIONS,
// 		authedUser: question.author,
// 		id: question.id,
// 	}
// }
