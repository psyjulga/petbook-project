import React, { ChangeEvent, useState } from 'react'
import { connect } from 'react-redux'
import { Post } from '../../../backend/src/models/post'
import { User } from '../../../backend/src/models/user'
import { AuthedUser, StoreObject } from '../util/types'
import { displayTimeInFrontend } from '../util/timeFunctions'
import {
	handleDeletePost,
	handleEditPost,
	handleReceivePosts,
} from '../actions/posts'
import { handleReceiveComments } from '../actions/comments'
import NewPicture from './NewPicture'
import MyDeleteButton from './MyDeleteButton'
import MyEditButton from './MyEditButton'
import MySaveButton from './MySaveButton'

type Props = {
	post: Post
	postAuthor: string
	authedUser: AuthedUser
	keyOfPost: number
	dispatch: Function
}

type Category = 'post_title' | 'text'

const PostComponent = (props: Props) => {
	const { post, postAuthor, authedUser, keyOfPost, dispatch } = props
	const { post_id, post_title, date, text, image } = post
	const { user_name, token } = authedUser

	const [editTitle, setEditTitle] = useState(false)
	const [editText, setEditText] = useState(false)
	const [disabled, setDisabled] = useState(true)

	const [input, setInput] = useState('')

	const localDate = new Date(date).toString()

	const authedToLoadPicture: boolean =
		image === null && user_name === postAuthor

	const authedToEditAndDelete: boolean = user_name === postAuthor

	// edit picture

	const cleanUp = (category: Category) => {
		if (category === 'post_title') setEditTitle(false)
		if (category === 'text') setEditText(false)
		setInput('')
		setDisabled(false)
	}

	const editPost = (category: Category) => {
		const field = category
		const value = input

		dispatch(
			handleEditPost(post_id as number, field, value, token, keyOfPost)
		).then(cleanUp(category))
	}

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		setInput(value)
		setDisabled(false)
	}

	const deletePost = () => {
		const confirmed = window.confirm(
			'Do you really want to delete this post? All comments and likes will also be removed.'
		)
		if (confirmed) {
			// delete post in DB
			dispatch(handleDeletePost(token, post_id as number)).then(() => {
				// sync redux store with DB
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
					<h5 className="card-title">
						{!editTitle ? (
							post_title
						) : (
							<input
								className="me-2"
								value={input}
								type="text"
								onChange={onInputChange}
							/>
						)}
						<span>
							{authedToEditAndDelete && !editTitle && (
								<MyEditButton
									onEdit={() => setEditTitle(true)}
									myClass="my-button-green-nobg"
								/>
							)}
							{authedToEditAndDelete && editTitle && (
								<MySaveButton
									onSave={() => editPost('post_title')}
									disabled={disabled}
								/>
							)}
						</span>
					</h5>

					<h6 className="card-subtitle mb-2 text-muted">
						{postAuthor} on {displayTimeInFrontend(localDate)}
					</h6>
					<p className="card-text">
						{!editText ? (
							text
						) : (
							<input
								className="me-2"
								value={input}
								type="text"
								onChange={onInputChange}
							/>
						)}
						<span>
							{authedToEditAndDelete && !editText && (
								<MyEditButton
									onEdit={() => setEditText(true)}
									myClass="my-button-green-nobg"
								/>
							)}
							{authedToEditAndDelete && editText && (
								<MySaveButton
									onSave={() => editPost('text')}
									disabled={disabled}
								/>
							)}
						</span>
					</p>
				</div>
				{authedToEditAndDelete && <MyDeleteButton destroy={deletePost} />}
			</div>
		</article>
	)
}

type DrilledProps = {
	post: Post
}

const mapStateToProps = (
	{ users, posts, authedUser }: StoreObject,
	{ post }: DrilledProps
) => {
	const usersArr: User[] = Object.values(users)
	const postsArr: Post[] = Object.values(posts)

	const postAuthorFound = usersArr.find(
		(u) => u.user_id === Number(post.user_id)
	)?.user_name

	const postAuthor =
		postAuthorFound !== undefined ? postAuthorFound : authedUser.user_name

	const keyOfPost: number = postsArr.findIndex(
		(p) => p.post_id === post.post_id
	)

	return {
		post,
		postAuthor,
		authedUser,
		keyOfPost,
	}
}

export default connect(mapStateToProps)(PostComponent)
