import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux'

const logger: Middleware =
	({ getState }: MiddlewareAPI) =>
	(next: Dispatch) =>
	(action: Action) => {
		console.group(action.type)
		console.log('The action: ', action)
		const returnValue = next(action) // dispatch(action)
		console.log('The new state: ', getState())
		console.groupEnd()

		return returnValue
	}

export default logger
