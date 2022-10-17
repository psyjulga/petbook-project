import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Newsfeed from './Newsfeed'
import UserComponent from './UserComponent'
import NewPost from './NewPost'
import { handleReceivePosts } from '../actions/posts'
import { handleReceiveComments } from '../actions/comments'
import { handleReceiveUsers } from '../actions/users'
import { AuthedUser, StoreObject } from '../util/types'
import { Dispatch } from 'redux'

type Props = {
	dispatch: any // !!!!
	authedUser: AuthedUser
}

const Dashboard = (props: Props) => {
	const { dispatch, authedUser } = props
	const { token } = authedUser

	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		dispatch(handleReceiveUsers())
			.then(() => console.log('1: users loaded'))
			.catch((e: Error) => setError(e))
		dispatch(handleReceivePosts(token))
			.then(() => console.log('2: posts loaded'))
			.catch((e: Error) => setError(e))
		dispatch(handleReceiveComments(token))
			.then(() => console.log('3: comments loaded'))
			.catch((e: Error) => setError(e))
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
