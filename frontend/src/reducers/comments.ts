// Comment MODEL METHODS:
// index => RECEIVE_COMMENTS ✔
// show
// create => ADD_COMMENT ✔
// showByPost
// edit
// delete

import { Comment } from '../../../backend/src/models/comment'
import { RECEIVE_COMMENTS, ADD_COMMENT } from '../actions/comments'

type CommentAction = { type: string; payload: Comment | Comment[] }

export default function comments(state = {}, action: CommentAction) {
	switch (action.type) {
		case RECEIVE_COMMENTS: {
			const { payload } = action // Comment[]
			return {
				...payload,
			}
		}

		case ADD_COMMENT: {
			const { payload } = action // Comment
			const copiedState = { ...state }
			const stateArr: Comment[] = Object.values(copiedState)
			stateArr.push(payload as Comment)

			return {
				...stateArr,
			}
		}

		default:
			return state
	}
}
