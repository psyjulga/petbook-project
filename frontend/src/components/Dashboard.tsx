import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Newsfeed from './Newsfeed'
import UserComponent from './UserComponent'
import NewPost from './NewPost'
import { handleReceivePosts } from '../actions/posts'

const Dashboard = (props: any) => {
	const { dispatch, authedUser } = props

	useEffect(() => {
		dispatch(handleReceivePosts(authedUser.token))
	})

	return (
		<div className="dashboard m-2">
			<div className="row">
				<div className="col-5">
					<UserComponent /> {/* user card with link to profile */}
					<br />
					{/* PETS */}
					{/* NEW PET */}
					<br />
					<NewPost /> {/* create new post form */}
				</div>
				<div className="col-7">
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
