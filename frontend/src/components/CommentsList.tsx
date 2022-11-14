import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Post } from '../../../backend/src/models/post'
import { Comment } from '../../../backend/src/models/comment'
import { StoreObject } from '../util/types'
import CommentComponent from './CommentComponent'
import NewComment from './NewComment'

type Props = {
	postComments: Comment[]
	post: Post
}

const CommentsList = (props: Props) => {
	const { postComments, post } = props
	const { post_id } = post

	const [add, setAdd] = useState(false)

	useEffect(() => {
		setAdd(false)
	}, [postComments])

	const postHasComments: boolean = postComments.length > 0

	return (
		<div className="comments-list">
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
			{/* add a new comment */}
			{add && <NewComment post_id={post_id} />}
			{!add && (
				<div className="new-comment-button-container text-center">
					<button
						className="new-comment-button btn btn-success"
						onClick={() => setAdd(true)}
					>
						➕ add a comment
					</button>
				</div>
			)}
		</div>
	)
}

type DrilledProps = {
	post: Post
}

const mapStateToProps = ({ comments }: StoreObject, { post }: DrilledProps) => {
	const commentsArr: Comment[] = Object.values(comments)
	const postComments: Comment[] = commentsArr.filter(
		(comment) => comment.post_id === post.post_id?.toString()
	)

	return {
		post,
		postComments,
	}
}

export default connect(mapStateToProps)(CommentsList)
