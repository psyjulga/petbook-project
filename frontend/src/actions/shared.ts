// receive data / handle initial data api call
// for App.ts => to load all data into the store => for access from all components
// get users, pets, users_pets, posts, comments, likes, commentsFromDeletedUsers, likesFromDeletedUsers

import { InitStore } from '../models/init'
const initStore = new InitStore()

// import { _getInitialData } from '../utils/_DATA'
// import { receiveQuestions } from './questions'
import { receiveUsers } from './users'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { Dispatch } from 'redux'

// returns a function
// => for thunk middleware to apply
// to handle async call

export function handleInitialData() {
	// trigger DATABASE function to get data and then save data to the redux store
	return (dispatch: Dispatch) => {
		dispatch(showLoading())
		return initStore
			.index()
			.then(({ users, pets, usersPets, posts, comments, likes }) => {
				dispatch(receiveUsers(users))
				dispatch(receivePets(pets))
				dispatch(receiveUsersPets(usersPets))
				dispatch(receivePosts(posts))
				dispatch(receiveComments(comments))
				dispatch(receiveLikes(likes))
				// = dispatch(action)
				// inside dispatch reducer updates the STORE
				dispatch(hideLoading())
			})
	}
}

// export function handleInitialData() {
//   // trigger database function and save data to store
// 	return (dispatch) => {
// 		dispatch(showLoading())
// 		return _getInitialData().then(({ users, questions }) => {
// 			dispatch(receiveUsers(users))
// 			dispatch(receiveQuestions(questions))
// 			// = dispatch(action)
// 			// inside dispatch reducer updates the store
// 			dispatch(hideLoading())
// 		})
// 	}
// }

// export function handleLogin(AUTHED_ID) {
// 	return (dispatch) => {
// 		dispatch(setAuthedUser(AUTHED_ID))
// 	}
// }
