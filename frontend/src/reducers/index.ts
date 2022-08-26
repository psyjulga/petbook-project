// combine reducers
// go into the store

import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import authedUser from './authedUser'
import users from './users'
import pets from './pets'
import usersPets from './usersPets'
import posts from './posts'
import comments from './comments'
import likes from './likes'

export default combineReducers({
	authedUser,
	users,
	pets,
	usersPets,
	posts,
	comments,
	likes,
	loadingBar: loadingBarReducer,
})
// so we will have one single state object
