import React, { ReactNode } from 'react'

// must be a CLASS COMPONENT

interface Props {
	children: ReactNode
}

interface State {
	hasError: boolean
}

export default class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error: Error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	// componentDidCatch(error, errorInfo) {
	// 	// You can also log the error to an error reporting service
	// 	logErrorToMyService(error, errorInfo)
	// }

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			// what the user will see:
			return <h1>Something went wrong.</h1>
			// in development, we see the error message
		}

		return this.props.children
	}
}
