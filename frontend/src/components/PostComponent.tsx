import React from 'react'
import { connect } from 'react-redux'
import { Post } from '../../../backend/src/models/post'
import { User } from '../../../backend/src/models/user'
import { AuthedUser, StoreObject } from '../util/types'
import { displayTimeInFrontend } from '../util/timeFunctions'
import { handleDeletePost } from '../actions/posts'
import { handleReceiveComments } from '../actions/comments'
import '../styles/styles.css'
import NewPicture from './NewPicture'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'

type Props = {
	post: Post
	postAuthor: string
	authedUser: AuthedUser
	dispatch: Function
}

const PostComponent = (props: Props) => {
	const { post, postAuthor, authedUser, dispatch } = props
	const { post_id, post_title, date, text, image } = post
	const { user_name, token } = authedUser
	// TODO video

	const localDate = new Date(date).toString()

	const authedToLoadPicture: boolean =
		image === null && user_name === postAuthor

	const authedToEditAndDelete: boolean = user_name === postAuthor

	// edit picture

	const editPostTitle = () => {
		console.log('editing post titel')
	}

	const editPostText = () => {
		console.log('editing post text')
	}

	const deletePost = () => {
		const confirmed = window.confirm(
			'Do you really want to delete this post? All comments and likes will also be removed.'
		)
		if (confirmed) {
			dispatch(handleDeletePost(token, post_id as number)).then(() => {
				dispatch(handleReceiveComments(token))
				// and likes !!
			})
		}
	}

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
					{authedToEditAndDelete && <EditButton edit={editPostTitle} />}
					<h6 className="card-subtitle mb-2 text-muted">
						{postAuthor} on {displayTimeInFrontend(localDate)}
					</h6>
					<p className="card-text">{text}</p>
					{authedToEditAndDelete && <EditButton edit={editPostText} />}
				</div>
				{authedToEditAndDelete && <DeleteButton destroy={deletePost} />}
			</div>
		</article>
	)
}

type DrilledProps = {
	post: Post
}

const mapStateToProps = (
	{ users, authedUser }: StoreObject,
	{ post }: DrilledProps
) => {
	const usersArr: User[] = Object.values(users)

	const postAuthorFound = usersArr.find(
		(u) => u.user_id === Number(post.user_id)
	)?.user_name

	const postAuthor =
		postAuthorFound !== undefined ? postAuthorFound : authedUser.user_name

	return {
		post,
		postAuthor,
		authedUser,
	}
}

export default connect(mapStateToProps)(PostComponent)
