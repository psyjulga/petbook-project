import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'
import store from './store'

// React 18
const container = document.getElementById('root')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
)

// React 17
// ReactDOM.render(
// 	<Provider store={store}>
// 		<Router>
// 			<App />
// 		</Router>
// 	</Provider>,
// 	document.getElementById('root')
// )
