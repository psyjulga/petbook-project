import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { handleAuthUser } from '../actions/authedUser'

const Login = (props: any): ReactElement => {
	const { users, dispatch } = props
	const navigate = useNavigate()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [disabled, setDisabled] = useState(true)

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		dispatch(handleAuthUser(username, password)).then((res: any) => {
			setUsername('')
			setPassword('')
			setDisabled(true)
			if (res) {
				navigate('/newsfeed')
			} else {
				alert('Username or Password invalid - please try again')
			}
		})
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		name === 'username' ? setUsername(value) : setPassword(value)
		username !== '' && password !== '' ? setDisabled(false) : setDisabled(true)
	}

	return (
		<div className="login">
			<form className="m-5" onSubmit={handleFormSubmit}>
				<div className="mb-3">
					<label htmlFor="usernameInput" className="form-label">
						Username
					</label>
					<input
						name="username"
						value={username}
						onChange={handleInputChange}
						type="text"
						className="form-control"
						id="usernameInput"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="passwordInput" className="form-label">
						Password
					</label>
					<input
						name="password"
						value={password}
						onChange={handleInputChange}
						type="password"
						className="form-control"
						id="passwordInput"
					/>
				</div>
				<button type="submit" className="btn btn-success" disabled={disabled}>
					Login
				</button>
			</form>

			<Link
				className="ms-5"
				to={'/new_user'}
				style={{
					color: 'rgb(25, 135, 84)',
					fontWeight: 'bold',
				}}
				title="Create an Account"
			>
				Create an Account
			</Link>
		</div>
	)
}

const mapStateToProps = ({ users }: any) => {
	return { users }
}

export default connect(mapStateToProps)(Login)
