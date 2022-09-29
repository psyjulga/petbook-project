import React, { ReactElement, useState } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { handleAddUserPicture } from '../actions/users'

const NewPicture = (props: any): ReactElement => {
	const { dispatch, keyOfUserObject, user_id } = props // user_id from parent component
	const { register, handleSubmit } = useForm()
	const [pic, setPic] = useState(false)

	const onSubmit = (data: any) => {
		const pic: File = data.file[0]
		const formData = new FormData()
		formData.append('file', pic)
		formData.append('table', 'users')

		dispatch(handleAddUserPicture(user_id, formData, keyOfUserObject)).then(
			() => {
				setPic(true)
			}
		)
	}

	return (
		<div className="new-picture">
			<div className="m-3">
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="fileInput" className="form-label">
						Choose a Profile Picture
					</label>
					<input
						className="form-control"
						type="file"
						id="fileInput"
						{...register('file')}
					/>
					<button className="btn btn-success">Upload Picture</button>
				</form>
			</div>
		</div>
	)
}

const mapStateToProps = ({ users, authedUser }: any) => {
	const numUsers = Object.keys(users).length

	let usersArr = []
	for (let i = 0; i < numUsers; i++) {
		usersArr.push(users[i])
	}

	const keyOfUserObject = usersArr.findIndex(
		(u) => u.user_name === authedUser.user_name
	)

	return { keyOfUserObject }
}

export default connect(mapStateToProps)(NewPicture)
