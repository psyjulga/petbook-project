import React from 'react'
import { connect } from 'react-redux'
import '../styles/post.css'

const PostComponent = (props: any) => {
	const { post } = props

	return (
		<div className="post">
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">Post title</h5>
					<h6 className="card-subtitle mb-2 text-muted">{post.author}</h6>
					<p className="card-text">{post.text}</p>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = ({ authedUser }: any, { post }: any) => {
	return {
		authedUser,
		post,
	}
}

export default connect(mapStateToProps)(PostComponent)
