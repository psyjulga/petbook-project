import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { insertDate } from '../util/timeFunctions'
import { handleAddComment } from '../actions/comments'
import { User } from '../../../backend/src/models/user'
import { Comment } from '../../../backend/src/models/comment'
import { StoreObject } from '../util/types'
import { returnNewKey } from '../util/returnNewKey'

type Props = {
	dispatch: any
	token: string
	newCommentKey: number
	userID?: string
	postID?: string
}

const NewComment = (props: Props) => {
	const { dispatch, token, newCommentKey, userID, postID } = props

	const [commentText, setCommentText] = useState('')
	const [disabled, setDisabled] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	const checkInput = () => {
		if (commentText !== '') {
			setDisabled(false)
		}
	}

	useEffect(() => {
		checkInput()
	}, [commentText])

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const date = insertDate()

		dispatch(
			handleAddComment(
				token,
				date,
				commentText,
				userID as string,
				postID as string,
				newCommentKey
			)
		)
			.then(() => {
				setCommentText('')
				setDisabled(true)
			})
			.catch((e: Error) => setError(e))
	}

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { value } = e.target
		setCommentText(value)
	}

	if (error) throw error

	return (
		<section className="new-comment m-3 border border-2 border-success border-opacity-25 rounded p-3">
			<h1>NEW COMMENT</h1>

			<form onSubmit={handleFormSubmit} className="m-4">
				{/* COMMENT TEXT */}
				<div className="mb-3">
					<textarea
						rows={4}
						onChange={handleInputChange}
						name="text"
						className="form-control"
						id="textInput"
						value={commentText}
						placeholder="Write some text ..."
						required
					/>
				</div>
				{/* BUTTON */}
				<button type="submit" className="btn btn-success" disabled={disabled}>
					Publish Comment
				</button>
			</form>
		</section>
	)
}

type DrilledProps = {
	post_id: number | undefined
}

const mapStateToProps = (
	{ comments, authedUser, users }: StoreObject,
	{ post_id }: DrilledProps
) => {
	const newCommentKey = returnNewKey(comments)

	const token = authedUser.token

	const usersArr: User[] = Object.values(users)
	const userID = usersArr
		.find((u) => u.user_name === authedUser.user_name)
		?.user_id?.toString()

	const postID = post_id?.toString()

	return { newCommentKey, token, userID, postID }
}

export default connect(mapStateToProps)(NewComment)
