import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Post } from '../../../backend/src/models/post'
import { Comment } from '../../../backend/src/models/comment'
import { User } from '../../../backend/src/models/user'
import { displayTimeInFrontend } from '../util/timeFunctions'
import NewPicture from './NewPicture'
import CommentComponent from './CommentComponent'
import '../styles/styles.css'
import { AuthedUser, StoreObject } from '../util/types'
import NewComment from './NewComment'

type Props = {
	post: Post
	postAuthor: string
	postComments: Comment[]
	authedUser: AuthedUser
}

const PostComponent = (props: Props) => {
	const { post, postAuthor, postComments, authedUser } = props
	const { post_id, post_title, date, text, image } = post
	const { user_name } = authedUser
	// TODO video

	const [add, setAdd] = useState(false)

	useEffect(() => {
		setAdd(false)
	}, [postComments])

	const localDate = new Date(date).toString()
	const postHasComments: boolean = postComments.length > 0
	const authedToLoadPicture: boolean =
		image === null && user_name === postAuthor

	return (
		<article className="post mb-4">
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
			{/* list of comments */}
			{postHasComments && (
				<ul>
					{postComments.map((comment: Comment) => (
						<li key={comment.comment_id}>
							<CommentComponent comment={comment} />
						</li>
					))}
				</ul>
			)}
			{/* add a comment */}
			{add && <NewComment post_id={post_id} />}
			{!add && (
				<div className="new-comment-button-container">
					<button
						type="submit"
						className="new-comment-button btn btn-success"
						onClick={() => setAdd(true)}
					>
						➕
					</button>
				</div>
			)}
		</article>
	)
}

type DrilledProps = {
	post: Post
}

const mapStateToProps = (
	{ users, authedUser, comments }: StoreObject,
	{ post }: DrilledProps
) => {
	const usersArr: User[] = Object.values(users)

	const postAuthorFound = usersArr.find(
		(u) => u.user_id === Number(post.user_id)
	)?.user_name

	const postAuthor =
		postAuthorFound !== undefined ? postAuthorFound : authedUser.user_name

	const commentsArr: Comment[] = Object.values(comments)
	const postComments: Comment[] = commentsArr.filter(
		(comment) => comment.post_id === post.post_id?.toString()
	)

	return {
		post,
		postAuthor,
		postComments,
		authedUser,
	}
}

export default connect(mapStateToProps)(PostComponent)
