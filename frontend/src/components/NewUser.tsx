import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react'
import { handleAddUser } from '../actions/users'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

const NewUser = (props: any): ReactElement => {
	console.log('props in new user: ', props)
	const { dispatch, numUsers } = props
	const navigate = useNavigate()

	const userObject = {
		user_name: '',
		first_name: '',
		last_name: '',
		email: '',
		country: '',
		city: '',
		profile_pic: '',
		password: '',
	}

	const [user, setUser] = useState(userObject)

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		dispatch(handleAddUser(user, numUsers)).then(() => {
			setUser(user)
			// setDisabled(true)
			navigate('/newsfeed')
		})
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUser({ ...user, [name]: value })
	}

	return (
		<div className="new-user">
			<form onSubmit={handleFormSubmit} className="m-5">
				{/* USERNAME */}
				<div className="mb-3">
					<label htmlFor="usernameInput" className="form-label">
						Username
					</label>
					<input
						onChange={handleInputChange}
						name="user_name"
						required
						type="text"
						className="form-control"
						id="usernameInput"
					/>
				</div>
				{/* FIRST NAME */}
				<div className="mb-3">
					<label htmlFor="firstNameInput" className="form-label">
						First Name
					</label>
					<input
						onChange={handleInputChange}
						name="first_name"
						required
						type="text"
						className="form-control"
						id="firstNameInput"
					/>
				</div>
				{/* LAST NAME */}
				<div className="mb-3">
					<label htmlFor="lastNameInput" className="form-label">
						Last Name
					</label>
					<input
						name="last_name"
						onChange={handleInputChange}
						required
						type="text"
						className="form-control"
						id="lastNameInput"
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
				{/* CITY */}
				<div className="mb-3">
					<label htmlFor="cityInput" className="form-label">
						City
					</label>
					<input
						name="city"
						onChange={handleInputChange}
						type="text"
						className="form-control"
						id="cityInput"
					/>
				</div>
				{/* EMAIL */}
				<div className="mb-3">
					<label htmlFor="emailInput" className="form-label">
						Email
					</label>
					<input
						name="email"
						onChange={handleInputChange}
						required
						type="email"
						className="form-control"
						id="emailInput"
					/>
				</div>
				{/* PASSWORD */}
				<div className="mb-3">
					<label htmlFor="passwordInput" className="form-label">
						Password
					</label>
					<input
						name="password"
						onChange={handleInputChange}
						required
						type="password"
						className="form-control"
						id="passwordInput"
					/>
				</div>
				{/* PROFILE PICTURE */}
				<div className="mb-3">
					<label htmlFor="fileInput" className="form-label">
						Profile Picture
					</label>
					<input
						name="profile_picture"
						onChange={handleInputChange}
						className="form-control"
						type="file"
						id="fileInput"
					/>
				</div>
				{/* BUTTON */}
				<button type="submit" className="btn btn-success">
					Create an Account
				</button>
			</form>
		</div>
	)
}

const mapStateToProps = ({ authedUser, users }: any) => {
	const numUsers = Object.keys(users).length
	return { authedUser, numUsers }
}

export default connect(mapStateToProps)(NewUser)
