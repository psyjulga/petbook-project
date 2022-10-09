import React from 'react'
import { connect } from 'react-redux'
import { Post } from '../../../backend/src/models/post'
import { Comment } from '../../../backend/src/models/comment'
import { User } from '../../../backend/src/models/user'
import displayTimeInFrontend from '../util/displayTimeInFrontend'
import NewPicture from './NewPicture'
import '../styles/styles.css'
import CommentComponent from './CommentComponent'

const PostComponent = (props: any) => {
	const { post, postAuthor, postComments, authedUser, dispatch } = props
	const { post_id, post_title, date, text, image }: Post = post
	const { user_name, token } = authedUser
	// video
	const localDate = new Date(date).toString()

	const authedToLoadPicture: boolean =
		image === null && user_name === postAuthor

	return (
		<div className="post">
			<div className="card card-post">
				{image && (
					<img
						src={window.location.origin + `/images/${image}`}
						className="card-img-top img-fluid"
						alt={`${post_title} picture`}
					/>
				)}
				{authedToLoadPicture && <NewPicture id={post_id} table={'posts'} />}

				<div className="card-body">
					<h5 className="card-title">{post_title}</h5>
					<h6 className="card-subtitle mb-2 text-muted">
						{postAuthor} on {displayTimeInFrontend(localDate)}
					</h6>
					<p className="card-text">{text}</p>
				</div>
			</div>
			{/* COMMENTS & LIKES */}
			{postComments && (
				<ul>
					{postComments.map((comment: Comment) => (
						<li key={comment.comment_id}>
							<CommentComponent comment={comment} />
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

const mapStateToProps = (
	{ users, authedUser, comments }: any,
	{ post }: any
) => {
	const usersArr: User[] = Object.values(users)
	const postAuthor = usersArr.find(
		(u) => u.user_id === Number(post.user_id)
	)?.user_name

	const commentsArr: Comment[] = Object.values(comments)
	const postComments = commentsArr.filter(
		(comment) => comment.post_id === post.post_id
	)

	return {
		post,
		postAuthor,
		postComments,
		authedUser,
	}
}

export default connect(mapStateToProps)(PostComponent)
