import React, { Fragment, useEffect } from 'react'
import { ReactElement } from 'react'
import { connect } from 'react-redux'
import { LoadingBar } from 'react-redux-loading-bar'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Login from './Login'
import Dashboard from './Dashboard'
import NewUser from './NewUser'
import { handleInitialData } from '../actions/shared' // ?? !!
import { handleReceiveUsers } from '../actions/users'

// on load: login form
// => authenticate
// link to signup form
// => create

// if logged in: dashboard / neewsfeed => DATA

const App = (props: any): ReactElement => {
	const { loading } = props
	console.log('props from app: ', props)

	useEffect(() => {
		console.log('from useEffect')
		// props.dispatch(handleInitialData())
		props.dispatch(handleReceiveUsers())
	}, [loading])

	return (
		<Fragment>
			<LoadingBar />
			<div className="app-container">
				<Navbar />
				<Routes>
					{/* <Route path="*" element={<NotFound page="page" />} /> */}
					<Route path="/" element={<Login />} />
					<Route path="/newsfeed" element={<Dashboard />} />
					<Route path="/new_user" element={<NewUser />} />
				</Routes>
			</div>
		</Fragment>
	)
}

const mapStateToProps = ({ users, authedUser }: any) => ({
	loading: authedUser === null,
	users,
})

export default connect(mapStateToProps)(App)
