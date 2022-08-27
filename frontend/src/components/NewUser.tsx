import React, { ReactElement } from 'react'

const NewUser = (): ReactElement => {
	return (
		<div className="new-user">
			<form className="m-5">
				<div className="mb-3">
					<label htmlFor="usernameInput" className="form-label">
						Username
					</label>
					<input type="text" className="form-control" id="usernameInput" />
				</div>

				<div className="mb-3">
					<label htmlFor="firstNameInput" className="form-label">
						First Name
					</label>
					<input type="text" className="form-control" id="firstNameInput" />
				</div>

				<div className="mb-3">
					<label htmlFor="lastNameInput" className="form-label">
						Last Name
					</label>
					<input type="text" className="form-control" id="lastNameInput" />
				</div>

				<div className="mb-3">
					<label htmlFor="countryInput" className="form-label">
						Country
					</label>
					<input type="text" className="form-control" id="countryInput" />
				</div>

				<div className="mb-3">
					<label htmlFor="cityInput" className="form-label">
						City
					</label>
					<input type="text" className="form-control" id="cityInput" />
				</div>

				<div className="mb-3">
					<label htmlFor="emailInput" className="form-label">
						Email
					</label>
					<input type="email" className="form-control" id="emailInput" />
				</div>

				<div className="mb-3">
					<label htmlFor="passwordInput" className="form-label">
						Password
					</label>
					<input type="password" className="form-control" id="passwordInput" />
				</div>

				<div className="mb-3">
					<label htmlFor="fileInput" className="form-label">
						Profile Picture
					</label>
					<input className="form-control" type="file" id="fileInput" />
				</div>

				<button type="submit" className="btn btn-success">
					Create an Account
				</button>
			</form>
		</div>
	)
}

export default NewUser
