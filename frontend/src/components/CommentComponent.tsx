import React from 'react'
import { connect } from 'react-redux'
import { Comment } from '../../../backend/src/models/comment'
import displayTimeInFrontend from '../util/displayTimeInFrontend'
import '../styles/styles.css'
import { User } from '../../../backend/src/models/user'

const CommentComponent = (props: any) => {
	const { comment, commentAuthor } = props
	const { date, text }: Comment = comment

	const localDate = new Date(date).toString()

	return (
		<div className="comment-component">
			<div className="card card-comment">
				<div className="card-body">
					<h6 className="card-subtitle mb-2 text-muted">
						{commentAuthor} on {displayTimeInFrontend(localDate)}
					</h6>
					<p className="card-text">{text}</p>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = ({ users }: any, { comment }: any) => {
	const usersArr: User[] = Object.values(users)
	const commentAuthor = usersArr.find(
		(u) => u.user_id === Number(comment.user_id)
	)?.user_name

	return {
		comment,
		commentAuthor,
	}
}

export default connect(mapStateToProps)(CommentComponent)
