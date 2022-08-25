import React from 'react'
import { connect } from 'react-redux'

const Dashboard = (props: any) => {
	return (
		<div className="dashboard">
			{/* posts with comments and likes */}
			{/* user with his pets */}
			{/* new post form */}
		</div>
	)
}

const mapStateToProps = ({ posts, authedUser }: any) => ({
	postIds: Object.keys(posts).sort((a, b) => posts[b].date - posts[a].date),
	authedUser,
	posts,
})

export default connect(mapStateToProps)(Dashboard)
