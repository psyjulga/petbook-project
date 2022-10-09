import React from 'react'
import { connect } from 'react-redux'
import { Post } from '../../../backend/src/models/post'
import PostComponent from './PostComponent'
import '../styles/styles.css'

const Newsfeed = (props: any) => {
	const { reversedPosts } = props

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

const mapStateToProps = ({ posts }: any) => {
	// postIds: Object.keys(posts).sort((a, b) => posts[b].date - posts[a].date),
	// is in order anyway ?
	const postsArr: Post[] = Object.values(posts)
	const reversedPosts = postsArr.reverse()
	return { reversedPosts }
}

export default connect(mapStateToProps)(Newsfeed)
