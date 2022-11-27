import React, { ChangeEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Post } from '../../../backend/src/models/post'
import { User } from '../../../backend/src/models/user'
import { AuthedUser, StoreObject } from '../util/types'
import { displayTimeInFrontend } from '../util/timeFunctions'
import { handleDeletePost, handleEditPost } from '../actions/posts'
import { handleReceiveComments } from '../actions/comments'
import NewPicture from './NewPicture'
import MyDeleteButton from './MyDeleteButton'
import MyEditButton from './MyEditButton'
import MySaveButton from './MySaveButton'
import Input from './Input'

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

	const [editPicture, setEditPicture] = useState(false)
	const [editTitle, setEditTitle] = useState(false)
	const [editText, setEditText] = useState(false)
	const [disabled, setDisabled] = useState(true)

	const [input, setInput] = useState('')

	useEffect(() => {
		setEditPicture(false)
	}, [image])

	const localDate = new Date(date).toString()

	const authedToEditAndDelete: boolean = user_name === postAuthor
	const showNewPictureInput: boolean = !image || editPicture

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

	const deletePicture = () => {
		const confirmed = window.confirm(
			'Do you really want to delete this picture?'
		)
		// set picture to null in DB
		if (confirmed)
			dispatch(
				handleEditPost(
					post_id as number,
					'image',
					null,
					token,
					keyOfPost,
					image as string
				)
			)
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
				{showNewPictureInput && authedToEditAndDelete && (
					<NewPicture id={post_id} table={'posts'} editImage={image} />
				)}
				{image && authedToEditAndDelete && (
					<span className="post-image-buttons">
						<MyEditButton
							onEdit={() => setEditPicture(true)}
							title="Edit Image"
						/>
						<MyDeleteButton destroy={deletePicture} title="Delete Image" />
					</span>
				)}

				<div className="card-body">
					<h5 className="card-title">
						{!editTitle ? (
							post_title
						) : (
							<Input onChange={onInputChange} input={input} />
						)}
						<span>
							{authedToEditAndDelete && !editTitle && (
								<MyEditButton
									onEdit={() => setEditTitle(true)}
									myClass="my-button-green-nobg"
									title="Edit Title"
								/>
							)}
							{authedToEditAndDelete && editTitle && (
								<MySaveButton
									title="Save Title"
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
							<Input onChange={onInputChange} input={input} />
						)}
						<span>
							{authedToEditAndDelete && !editText && (
								<MyEditButton
									title="Edit Text"
									onEdit={() => setEditText(true)}
									myClass="my-button-green-nobg"
								/>
							)}
							{authedToEditAndDelete && editText && (
								<MySaveButton
									title="Save Text"
									onSave={() => editPost('text')}
									disabled={disabled}
								/>
							)}
						</span>
					</p>
					{authedToEditAndDelete && (
						<span className="post-delete-button">
							<MyDeleteButton destroy={deletePost} title="DELETE POST" />
						</span>
					)}
				</div>
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
