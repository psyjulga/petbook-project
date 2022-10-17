import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Newsfeed from './Newsfeed'
import UserComponent from './UserComponent'
import NewPost from './NewPost'
import { handleReceivePosts } from '../actions/posts'
import { handleReceiveComments } from '../actions/comments'
import { handleReceiveUsers } from '../actions/users'
import { StoreObject } from '../util/types'

const Dashboard = (props: any) => {
	const { dispatch, authedUser } = props
	const { token } = authedUser

	const [error, setError] = useState(null)

	useEffect(() => {
		dispatch(handleReceiveUsers()).catch((e: any) => setError(e))
		dispatch(handleReceivePosts(token)).catch((e: any) => setError(e))
		dispatch(handleReceiveComments(token)).catch((e: any) => setError(e))
	}, [])

	if (error) throw error

	return (
		<div className="dashboard m-2">
			<div className="row">
				<div className="col-5">
					<UserComponent /> {/* user card with link to profile */}
					<br />
					{/* todo PETS */}
					{/* todo NEW PET */}
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

const mapStateToProps = ({ authedUser }: StoreObject) => ({
	authedUser,
})

export default connect(mapStateToProps)(Dashboard)
