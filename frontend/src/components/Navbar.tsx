import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleLogout } from '../actions/authedUser'

const Navbar = (props: any) => {
	const { loggedIn, dispatch } = props

	const logOut = () => {
		dispatch(handleLogout())
		console.log('LOGOUT')
	}

	return (
		<nav className="navbar navbar-expand-lg bg-light">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">
					🐶PETBOOK🐱
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<a className="nav-link active" aria-current="page" href="#">
								Home
							</a>
						</li>
						{loggedIn && (
							<li className="nav-item">
								<Link onClick={logOut} to={'/'} className="nav-link">
									Logout
								</Link>
							</li>
						)}
					</ul>
					<form className="d-flex" role="search">
						<input
							className="form-control me-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button className="btn btn-outline-success" type="submit">
							Search
						</button>
					</form>
				</div>
			</div>
		</nav>
	)
}

const mapStateToProps = ({ authedUser }: any) => {
	return { loggedIn: authedUser !== null }
}

export default connect(mapStateToProps)(Navbar)
