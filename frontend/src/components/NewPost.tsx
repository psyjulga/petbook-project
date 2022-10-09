import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import NewPicture from './NewPicture'
import convertTimestamp from '../util/convertTimestamp'
import { handleAddPost } from '../actions/posts'
import { User } from '../../../backend/src/models/user'
import { Post } from '../../../backend/src/models/post'

const NewPost = (props: any) => {
	const { dispatch, token, newKey, userID } = props

	const insertDate = () => {
		const date = new Date().toString()
		const timestamp = convertTimestamp(date)
		return timestamp
	}

	const initialPostObject: Post = {
		date: insertDate(),
		post_title: '',
		text: '',
		user_id: userID,
	}

	const [post, setPost] = useState(initialPostObject)
	const [disabled, setDisabled] = useState(true)

	const checkInput = () => {
		if (post.post_title !== '' && post.text !== '') {
			setDisabled(false)
		}
	}

	useEffect(() => {
		checkInput()
	}, [post])

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(handleAddPost(token, post, newKey)).then(() => {
			setPost(initialPostObject)
			setDisabled(true)
		})
	}

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setPost({ ...post, [name]: value })
	}

	return (
		<div className="new-post m-3 border border-2 border-success border-opacity-25 rounded p-3">
			<h1>NEW POST</h1>
			{/* IMAGE */}
			{/* <NewPicture id={} table={'posts'} />  */}
			{/* after post is created, => we need the post_id */}

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
		</div>
	)
}

const mapStateToProps = ({ posts, authedUser, users }: any) => {
	const postsArr: Post[] = Object.values(posts)
	const postIDs = postsArr.map((p) => p.post_id)
	//@ts-ignore
	const newKey: number = Math.max(...postIDs)

	const token = authedUser.token

	const usersArr: User[] = Object.values(users)
	const userID = usersArr.find(
		(u) => u.user_name === authedUser.user_name
	)?.user_id

	return { newKey, token, userID }
}

export default connect(mapStateToProps)(NewPost)
