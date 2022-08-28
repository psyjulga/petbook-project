import React from 'react'
import { connect } from 'react-redux'
import { Post } from '../../../backend/src/models/post'
import PostComponent from './PostComponent'
import '../styles/newsfeed.css'

const Newsfeed = (props: any) => {
	const { posts, numPosts } = props

	let postsArr = []
	for (let i = 0; i < numPosts; i++) {
		postsArr.push(posts[i])
	}

	return (
		<div className="newsfeed mt-4">
			<ul>
				{postsArr.map((post: Post) => (
					<li key={post.post_id} className="m-2">
						<PostComponent post={post} />
					</li>
				))}
			</ul>
		</div>
	)
}

const mapStateToProps = ({ posts }: any) => {
	// postIds: Object.keys(posts).sort((a, b) => posts[b].date - posts[a].date),
	// is in order anyway ?
	const numPosts = Object.keys(posts).length
	return { posts, numPosts }
}

export default connect(mapStateToProps)(Newsfeed)
