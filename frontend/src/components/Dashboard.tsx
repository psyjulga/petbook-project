import React from 'react'
import { connect } from 'react-redux'

const Dashboard = (props: any) => {
	console.log('Hello from Dashboard - props.authedUser: ', props.authedUser)
	return (
		<div className="dashboard">
			<h1>Dashboard</h1>
			{/* posts with comments and likes */}
			{/* user with his pets */}
			{/* new post form */}
		</div>
	)
}

const mapStateToProps = ({ authedUser }: any) => ({
	// postIds: Object.keys(posts).sort((a, b) => posts[b].date - posts[a].date),
	authedUser,
})

export default connect(mapStateToProps)(Dashboard)
