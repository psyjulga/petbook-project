import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Newsfeed from './Newsfeed'
import UserComponent from './UserComponent'
import { handleReceivePosts } from '../actions/posts'

const Dashboard = (props: any) => {
	const { dispatch, authedUser } = props

	useEffect(() => {
		dispatch(handleReceivePosts(authedUser.token))
	})

	return (
		<div className="dashboard">
			<div className="row">
				<div className="col">
					<UserComponent /> {/* user with pets, new pet */}
					{/* new post form */}
					<h1>NEW POST</h1>
				</div>
				<div className="col">
					<Newsfeed /> {/* posts with comments and likes */}
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = ({ authedUser }: any) => ({
	authedUser,
})

export default connect(mapStateToProps)(Dashboard)
