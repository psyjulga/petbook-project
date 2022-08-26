export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser(id: string) {
	return {
		type: SET_AUTHED_USER,
		id,
	}
}
