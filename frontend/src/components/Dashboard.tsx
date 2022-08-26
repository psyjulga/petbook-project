import React from 'react'
import { connect } from 'react-redux'

const Dashboard = (props: any) => {
	console.log('Hello from Dashboard')
	return (
		<div className="dashboard">
			<h1>Dashboard</h1>
			{/* posts with comments and likes */}
			{/* user with his pets */}
			{/* new post form */}
		</div>
	)
}

const mapStateToProps = ({ posts, authedUser }: any) => ({
	// postIds: Object.keys(posts).sort((a, b) => posts[b].date - posts[a].date),
	authedUser,
	posts,
})

export default connect(mapStateToProps)(Dashboard)
