import React, { ReactElement, useState } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { handleAddUserPicture } from '../actions/users'

const NewPicture = (props: any): ReactElement => {
	const { dispatch, user_id } = props // user_id from parent component
	const { register, handleSubmit } = useForm()
	const [pic, setPic] = useState(false)

	const onSubmit = (data: any) => {
		const pic: File = data.file[0]
		const formData = new FormData()
		formData.append('file', pic)
		formData.append('table', 'users')

		dispatch(handleAddUserPicture(user_id, formData)).then(() => {
			setPic(true)
		})
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

const mapStateToProps = ({ authedUser }: any) => {
	return { authedUser } // we don't need this, but to get dispatch
}

export default connect(mapStateToProps)(NewPicture)
