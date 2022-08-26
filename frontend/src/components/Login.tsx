import React, { ReactElement } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// an existent user logs in with username and password
const Login = (): ReactElement => {
	// props: any
	// console.log('props / users, pets from Login: ', props)

	return (
		<div className="login">
			<form className="m-5">
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
					Login
				</button>
			</form>

			<Link className="ms-5" to={'/new_user'}>
				Create an Account
			</Link>
		</div>
	)
}

// const mapStateToProps = ({ users, pets }: any) => {
// 	// ......
// 	return { users, pets }
// }

// export default connect(mapStateToProps)(Login)
export default Login
