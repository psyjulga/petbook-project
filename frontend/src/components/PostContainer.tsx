import React from 'react'
import { Post } from '../../../backend/src/models/post'
import CommentList from './CommentsList'
import PostComponent from './PostComponent'

type Props = {
	post: Post
}

const PostContainer = (props: Props) => {
	const { post } = props

	return (
		<div className="post-container">
			{/* POST */}
			<PostComponent post={post} />
			{/* COMMENTS */}
			<CommentList post={post} />
			{/* LIKES */}
			{/* todo */}
		</div>
	)
}

export default PostContainer
