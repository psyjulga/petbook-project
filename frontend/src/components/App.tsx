import React, { Fragment, useEffect, useState } from 'react'
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
import { StoreObject } from '../util/types'

// on load: login form => authenticate user
// link to signup form => create new user

const App = (props: any): ReactElement => {
	const { loading, dispatch } = props
	// check loading logic

	const [error, setError] = useState(null)

	useEffect(() => {
		dispatch(handleReceiveUsers()).catch((e: any) => setError(e))
	}, [loading])

	if (error) throw error
	// so the error boundary will catch async errors too

	return (
		<Fragment>
			<LoadingBar />
			<div className="app-container">
				<Navbar />
				<br />
				<br />
				<main>
					<Routes>
						{/* <Route path="*" element={<NotFound page="page" />} /> */}
						<Route path="/" element={<Login />} />
						<Route path="/newsfeed" element={<Dashboard />} />
						<Route path="/new_user" element={<NewUser />} />
						<Route path="/user_profile" element={<UserProfile />} />
					</Routes>
				</main>
				<br />
				<br />
				<Footer />
			</div>
		</Fragment>
	)
}

const mapStateToProps = ({ users, authedUser }: StoreObject) => ({
	loading: authedUser === null,
	users,
})

export default connect(mapStateToProps)(App)
