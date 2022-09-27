import React from 'react'
import { useForm } from 'react-hook-form'

const NewPicture = () => {
	const { register, handleSubmit } = useForm()

	const onSubmit = (data: {}) => {
		console.log('DATA from picture upload: ', data)
	}

	return (
		<div className="new-picture">
			<div className="mb-3">
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="fileInput" className="form-label">
						Profile Picture
					</label>
					<input
						className="form-control"
						type="file"
						id="fileInput"
						{...register('profile_picture')}
					/>
					<button>Upload Picture</button>
				</form>
			</div>
		</div>
	)
}

export default NewPicture
