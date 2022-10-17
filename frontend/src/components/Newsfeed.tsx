import React from 'react'
import { connect } from 'react-redux'
import { Post } from '../../../backend/src/models/post'
import PostComponent from './PostComponent'
import '../styles/styles.css'
import { StoreObject } from '../util/types'

type Props = {
	reversedPosts: Post[]
}

const Newsfeed = (props: Props) => {
	const { reversedPosts } = props

	return (
		<section className="newsfeed mt-5 mb-5">
			<ul>
				{reversedPosts.map((post: Post) => (
					<li key={post.post_id} className="m-2">
						<PostComponent post={post} />
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
