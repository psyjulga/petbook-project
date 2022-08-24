import React from 'react'
import { ReactNode } from 'react'

const App = (): ReactNode => {
	// @ts-ignore
	return <h1>hello from app</h1> // implicit any
}

// export default connect(mapStateToProps)(App)
export default App
