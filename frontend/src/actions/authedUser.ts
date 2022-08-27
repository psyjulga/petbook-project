import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { Dispatch } from 'redux'

export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser(token: string | null) {
	return {
		type: SET_AUTHED_USER,
		token,
	}
}

export function handleAuthUser(user_name: string, password: string) {
	const loginData = {
		user_name,
		password,
	}
	return (dispatch: Dispatch) => {
		dispatch(showLoading())

		return fetch('http://localhost:8000/authenticate_user', {
			method: 'POST',
			body: JSON.stringify(loginData),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((res) => {
				if (res.status === 401) {
					throw new Error('username or password invalid')
				}
				return res.json()
			})
			.then((token) => {
				dispatch(setAuthedUser(token))
			})
			.then(() => dispatch(hideLoading()))
			.catch((e) => {
				console.log('error in handleAuthUser: ', e)
			})
	}
}

export function handleLogout() {
	return (dispatch: Dispatch) => {
		dispatch(setAuthedUser(null))
	}
}
