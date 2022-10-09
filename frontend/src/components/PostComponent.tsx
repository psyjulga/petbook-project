import React from 'react'
import { connect } from 'react-redux'
import { Post } from '../../../backend/src/models/post'
import { User } from '../../../backend/src/models/user'
import NewPicture from './NewPicture'
import displayTimeInFrontend from '../util/displayTimeInFrontend'
import '../styles/styles.css'

const PostComponent = (props: any) => {
	const { post, postAuthor, authedUser } = props
	const { post_id, post_title, date, text, image }: Post = post
	const { user_name } = authedUser
	// video
	const localDate = new Date(date).toString()

	const authedToLoadPicture: boolean =
		image === null && user_name === postAuthor

	return (
		<div className="post">
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
		</div>
	)
}

const mapStateToProps = ({ users, authedUser }: any, { post }: any) => {
	const usersArr: User[] = Object.values(users)
	const postAuthor = usersArr.find(
		(u) => u.user_id === Number(post.user_id)
	)?.user_name

	return {
		post,
		postAuthor,
		authedUser,
	}
}

export default connect(mapStateToProps)(PostComponent)
