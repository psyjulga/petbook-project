import React from 'react'
import { connect } from 'react-redux'
import { Post } from '../../../backend/src/models/post'
import { Comment } from '../../../backend/src/models/comment'
import { User } from '../../../backend/src/models/user'
import displayTimeInFrontend from '../util/displayTimeInFrontend'
import NewPicture from './NewPicture'
import CommentComponent from './CommentComponent'
import '../styles/styles.css'

const PostComponent = (props: any) => {
	const { post, postAuthor, postComments, authedUser } = props
	const { post_id, post_title, date, text, image }: Post = post
	const { user_name } = authedUser
	// video
	const localDate = new Date(date).toString()
	const postHasComments: boolean = postComments.length > 0
	const authedToLoadPicture: boolean =
		image === null && user_name === postAuthor

	return (
		<div className="post mb-4">
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
			{postHasComments && (
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
		(comment) => comment.post_id === post.post_id.toString()
	)

	return {
		post,
		postAuthor,
		postComments,
		authedUser,
	}
}

export default connect(mapStateToProps)(PostComponent)
