import React, { ReactElement } from 'react'
// import { connect } from 'react-redux'

// an existent user logs in with username and password
const Login = (props: any): ReactElement => {
	console.log('Hello from Login')

	return (
		<div className="login">
			<form>
				<div className="mb-3">
					<label htmlFor="usernameInput" className="form-label">
						Username
					</label>
					<input type="text" className="form-control" id="usernameInput" />
				</div>
				<div className="mb-3">
					<label htmlFor="passwordInput" className="form-label">
						Password
					</label>
					<input type="password" className="form-control" id="passwordInput" />
				</div>
				<button type="submit" className="btn btn-primary">
					Sign In
				</button>
			</form>
		</div>
	)
}

// const mapStateToProps = ({ users }: any) => {
// 	// ......
// 	return { users }
// }

// export default connect(mapStateToProps)(Login)

export default Login
