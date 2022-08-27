import { SET_AUTHED_USER } from '../actions/authedUser'

type authAction = {
	type: string
	token: string | null
}

export default function authedUser(state = null, action: authAction) {
	switch (action.type) {
		case SET_AUTHED_USER:
			return action.token

		default:
			return state
	}
}
