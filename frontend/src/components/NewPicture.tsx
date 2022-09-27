import React, { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { handleEditUser } from '../actions/users'

const NewPicture = (props: any): ReactElement => {
	const { dispatch, user_id } = props
	console.log('new picture props user_id: ', user_id)
	const { register, handleSubmit } = useForm()

	const onSubmit = (data: any) => {
		console.log('DATA from picture upload: ', data)
		console.log(
			'DATA.profile_picture[0] from picture upload: ',
			data.profile_picture[0]
		)
		const pic: File = data.profile_picture[0]
		const formData = new FormData()
		formData.append('file', pic)

		dispatch(handleEditUser(pic, user_id, 'users', formData)).then(() => {
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
						{...register('profile_picture')}
					/>
					<button className="btn btn-success">Upload Picture</button>
				</form>
			</div>
		</div>
	)
}

export default NewPicture
