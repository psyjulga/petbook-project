import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Post } from '../../../backend/src/models/post'
import { handleReceiveComments } from '../actions/comments'
import PostComponent from './PostComponent'
import '../styles/styles.css'

const Newsfeed = (props: any) => {
	const { reversedPosts, token, dispatch } = props

	useEffect(() => {
		dispatch(handleReceiveComments(token))
	})

	return (
		<div className="newsfeed mt-4 mb-5">
			<ul>
				{reversedPosts.map((post: Post) => (
					<li key={post.post_id} className="m-2">
						<PostComponent post={post} />
					</li>
				))}
			</ul>
		</div>
	)
}

const mapStateToProps = ({ posts, authedUser }: any) => {
	const postsArr: Post[] = Object.values(posts)
	const reversedPosts = postsArr.reverse()
	const { token } = authedUser
	return { reversedPosts, token }
}

export default connect(mapStateToProps)(Newsfeed)
