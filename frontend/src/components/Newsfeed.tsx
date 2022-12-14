import React from 'react'
import { connect } from 'react-redux'
import { Post } from '../../../backend/src/models/post'
import { StoreObject } from '../util/types'
import PostContainer from './PostContainer'

type Props = {
	reversedPosts: Post[]
	newsfeedRef: any // !!
}

const Newsfeed = (props: Props) => {
	const { reversedPosts, newsfeedRef } = props

	return (
		<section className="newsfeed">
			<h1>NEWSFEED</h1>
			<div className="scroll-to-div" ref={newsfeedRef}></div>
			<ul>
				{reversedPosts.map((post: Post) => (
					<li key={post.post_id} className="m-2">
						<PostContainer post={post} />
					</li>
				))}
			</ul>
		</section>
	)
}

const mapStateToProps = ({ posts }: StoreObject) => {
	const postsArr: Post[] = Object.values(posts)
	const reversedPosts = postsArr.reverse()

	return { reversedPosts }
}

export default connect(mapStateToProps)(Newsfeed)
