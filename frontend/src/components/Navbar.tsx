import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleLogout } from '../actions/authedUser'
import { StoreObject } from '../util/types'

type Props = {
	loggedIn: boolean
	dispatch: any
}

const Navbar = (props: Props) => {
	const { loggedIn, dispatch } = props
	// logout button still visible when logged out !!

	const logOut = () => {
		dispatch(handleLogout())
	}

	return (
		<nav className="navbar fixed-top navbar-expand-md bg-light">
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
							<Link
								to={'/newsfeed'}
								className="nav-link active"
								aria-current="page"
							>
								Home
							</Link>
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

const mapStateToProps = ({ authedUser }: StoreObject) => {
	return { loggedIn: authedUser.token !== null }
}

export default connect(mapStateToProps)(Navbar)
