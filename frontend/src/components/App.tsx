import React, { Fragment, useEffect } from 'react'
import { ReactElement } from 'react'
import { connect } from 'react-redux'
import { LoadingBar } from 'react-redux-loading-bar'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Login from './Login'
import Dashboard from './Dashboard'
import Footer from './Footer'
import NewUser from './NewUser'
import UserProfile from './UserProfile'
import { handleReceiveUsers } from '../actions/users'

// on load: login form => authenticate user
// link to signup form => create new user

const App = (props: any): ReactElement => {
	const { loading, dispatch } = props

	useEffect(() => {
		dispatch(handleReceiveUsers())
	}, [loading])

	return (
		<Fragment>
			<LoadingBar />
			<div className="app-container">
				<Navbar />
				<br />
				<br />
				<Routes>
					{/* <Route path="*" element={<NotFound page="page" />} /> */}
					<Route path="/" element={<Login />} />
					<Route path="/newsfeed" element={<Dashboard />} />
					<Route path="/new_user" element={<NewUser />} />
					<Route path="/user_profile" element={<UserProfile />} />
				</Routes>
				<br />
				<Footer />
			</div>
		</Fragment>
	)
}

const mapStateToProps = ({ users, authedUser }: any) => ({
	loading: authedUser === null,
	users,
})

export default connect(mapStateToProps)(App)
