import React from 'react'
import { Comment } from '../../../backend/src/models/comment'
import displayTimeInFrontend from '../util/displayTimeInFrontend'

const CommentComponent = (props: any) => {
	const { comment } = props
	const { date, text, user_id }: Comment = comment

	const localDate = new Date(date).toString()

	return (
		<div className="comment-component">
			<p>
				{user_id} on {displayTimeInFrontend(localDate)}
			</p>
			<p>{text}</p>
		</div>
	)
}

export default CommentComponent
