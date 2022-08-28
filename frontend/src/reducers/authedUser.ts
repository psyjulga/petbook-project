import { SET_AUTHED_USER } from '../actions/authedUser'

type authAction = {
	type: string
	token: string | null
	user_name: string
}

export default function authedUser(state = null, action: authAction) {
	switch (action.type) {
		case SET_AUTHED_USER: {
			const { token, user_name } = action

			return {
				token: token,
				user_name: user_name,
			}
		}

		default:
			return state
	}
}
