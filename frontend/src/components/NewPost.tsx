import React from 'react'
import { connect } from 'react-redux'

const NewPost = () => {
	// date !!!!

	const handleFormSubmit = () => {}

	const handleInputChange = () => {}

	return (
		<div className="new-post">
			<form onSubmit={handleFormSubmit} className="m-4">
				{/* TEXT */}
				<div className="mb-3">
					<textarea
						onChange={handleInputChange}
						name="text"
						required
						className="form-control"
						id="textInput"
					/>
				</div>
				{/* IMAGE */}
				<div className="mb-3">
					<label htmlFor="imageInput" className="form-label">
						Image
					</label>
					<input
						onChange={handleInputChange}
						name="image"
						type="file"
						className="form-control"
						id="imageInput"
					/>
				</div>
				{/* VIDEO */}
				<div className="mb-3">
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
				</div>
				{/* COUNTRY */}
				<div className="mb-3">
					<label htmlFor="countryInput" className="form-label">
						Country
					</label>
					<input
						name="country"
						onChange={handleInputChange}
						type="text"
						className="form-control"
						id="countryInput"
					/>
				</div>
				{/* author => dropdown user & pets */}
				{/* BUTTON */}
				<button type="submit" className="btn btn-success">
					Create an Account
				</button>
			</form>
		</div>
	)
}
