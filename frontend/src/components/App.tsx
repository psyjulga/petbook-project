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
import { handleReceiveUsers } from '../actions/users'
import { StoreObject } from '../util/types'
import '../styles/styles.css'

// on load: login form => authenticate user
// link to signup form => create new user

type Props = {
	loading: boolean
	dispatch: Function
}

const App = (props: Props): ReactElement => {
	const { loading, dispatch } = props
	// check loading logic

	// onclick home when not logged in => forward to login page !!

	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		dispatch(handleReceiveUsers()).catch((e: Error) => setError(e))
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
