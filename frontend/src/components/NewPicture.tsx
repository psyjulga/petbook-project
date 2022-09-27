import React from 'react'
import { useForm } from 'react-hook-form'

const NewPicture = () => {
	const { register, handleSubmit } = useForm()

	const onSubmit = (data: any) => {
		console.log('DATA from picture upload: ', data)
		console.log(
			'DATA.profile_picture[0] from picture upload: ',
			data.profile_picture[0]
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
						{...register('profile_picture')}
					/>
					<button className="btn btn-success">Upload Picture</button>
				</form>
			</div>
		</div>
	)
}

export default NewPicture
