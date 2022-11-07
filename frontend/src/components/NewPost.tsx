import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { insertDate } from '../util/timeFunctions'
import { handleAddPost } from '../actions/posts'
import { User } from '../../../backend/src/models/user'
import { Post } from '../../../backend/src/models/post'
import { StoreObject } from '../util/types'
import '../styles/styles.css'

type Props = {
	dispatch: Function
	token: string
	userID?: string
	scrollCallback: Function
}

const NewPost = (props: Props) => {
	const { dispatch, token, userID, scrollCallback } = props

	const initialPostObject: Post = {
		date: insertDate(),
		post_title: '',
		text: '',
		user_id: userID as string,
	}

	const [post, setPost] = useState(initialPostObject)
	const [disabled, setDisabled] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	const checkInput = () => {
		if (post.post_title !== '' && post.text !== '') {
			setDisabled(false)
		}
	}
	// !!!!
	useEffect(() => {
		checkInput()
	}, [post])

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		dispatch(handleAddPost(token, post))
			.then(() => {
				setPost(initialPostObject)
				setDisabled(true)
				scrollCallback()
			})
			.catch((e: Error) => setError(e))
	}

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setPost({ ...post, [name]: value })
	}

	if (error) throw error

	return (
		<section className="new-post mt-5 ms-3 border border-2 border-success border-opacity-25 rounded p-3">
			<h1>NEW POST</h1>
			<form onSubmit={handleFormSubmit} className="m-4">
				{/* POST TITLE */}
				<div className="mb-3">
					<label htmlFor="titleInput" className="form-label">
						Title of your Post
					</label>
					<input
						name="post_title"
						onChange={handleInputChange}
						type="text"
						className="form-control"
						id="titleInput"
						value={post.post_title}
						required
					/>
				</div>
				{/* TEXT */}
				<div className="mb-3">
					<textarea
						rows={6}
						onChange={handleInputChange}
						name="text"
						className="form-control"
						id="textInput"
						value={post.text}
						placeholder="Write some text ..."
						required
					/>
				</div>
				{/* VIDEO */}
				{/* <div className="mb-3">
					<label htmlFor="videoInput" className="form-label">
						Video
					</label>
					<input
						name="video"
						onChange={handleInputChange}
						type="file"
						className="form-control"
						id="videoInput"
					/>
				</div> */}
				{/* BUTTON */}
				<button type="submit" className="btn btn-success" disabled={disabled}>
					Publish Post
				</button>
			</form>
		</section>
	)
}

const mapStateToProps = ({ authedUser, users }: StoreObject) => {
	const { token } = authedUser

	const usersArr: User[] = Object.values(users)

	const userID = usersArr
		.find((u) => u.user_name === authedUser.user_name)
		?.user_id?.toString()

	return { token, userID }
}

export default connect(mapStateToProps)(NewPost)
