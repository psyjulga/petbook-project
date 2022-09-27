import React, { ReactElement } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { handleEditUser } from '../actions/users'

const NewPicture = (props: any): ReactElement => {
	const { dispatch, user_id } = props // user_id from parent component
	const { register, handleSubmit } = useForm()

	const onSubmit = (data: any) => {
		const pic: File = data.file[0]
		const formData = new FormData()
		formData.append('file', pic)
		formData.append('table', 'users')

		dispatch(handleEditUser(user_id, formData)).then(() => {
			console.log('dispatch handle edit user')
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
