import React from 'react'
import { ReactElement } from 'react'
import Login from './Login'

const App = (): ReactElement => {
	console.log('Hello from App')
	// on load: signup / login form
	// => users data needed
	// create
	// authenticate

	// if logged in: dashboard

	// const { loading } = props

	// useEffect(() => {
	// 	props.dispatch(handleInitialData()) // load all data from the database tables into the redux store
	// }, [loading])

	return (
		<div className="app">
			<h1>Hello World from App</h1>
			<Login />
		</div>
	)
}

// export default connect(mapStateToProps)(App)
export default App
