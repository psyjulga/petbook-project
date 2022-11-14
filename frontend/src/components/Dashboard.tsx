import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import Newsfeed from './Newsfeed'
import UserContainer from './UserContainer'
import NewPost from './NewPost'
import Pets from './Pets'
import { handleReceivePosts } from '../actions/posts'
import { handleReceiveComments } from '../actions/comments'
import { handleReceiveUsers } from '../actions/users'
import { handleReceivePets } from '../actions/pets'
import { AuthedUser, StoreObject } from '../util/types'
import { Post } from '../../../backend/src/models/post'
import { Comment } from '../../../backend/src/models/comment'
import { Pet } from '../../../backend/src/models/pet'
import { User } from '../../../backend/src/models/user'

type Props = {
	dispatch: Function
	authedUser: AuthedUser
	postsArr: Post[]
	commentsArr: Comment[]
	usersArr: User[]
	petsArr: Pet[]
}

const Dashboard = (props: Props) => {
	const { dispatch, authedUser, postsArr, commentsArr, usersArr, petsArr } =
		props
	const { token } = authedUser

	// scrolling to:
	const newsfeedRef = useRef()
	// from here:
	const scrollCallback = () => {
		// @ts-ignore
		newsfeedRef.current.scrollIntoView()
		// does not work ??!!
	}

	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		dispatch(handleReceiveUsers())
			.then(() => console.log('1: USERS loaded'))
			.catch((e: Error) => setError(e))
	}, [usersArr.length])

	useEffect(() => {
		dispatch(handleReceivePets(token))
			.then(() => console.log('4: PETS loaded'))
			.catch((e: Error) => setError(e))
	}, [petsArr.length])

	useEffect(() => {
		dispatch(handleReceivePosts(token))
			.then(() => console.log('2: POSTS loaded'))
			.catch((e: Error) => setError(e))
	}, [postsArr.length])

	useEffect(() => {
		dispatch(handleReceiveComments(token))
			.then(() => console.log('3: COMMENTS loaded'))
			.catch((e: Error) => setError(e))
	}, [commentsArr.length])

	if (error) throw error

	return (
		<div className="dashboard container-fluid m-2">
			<div className="row">
				<Pets /> {/* all of the users pets */}
			</div>
			<div className="row mt-2">
				<div className="col-5">
					<UserContainer /> {/* user card with link to profile */}
					{/* todo NEW PET */}
					<NewPost scrollCallback={scrollCallback} />{' '}
					{/* create new post form */}
				</div>

				<div className="col-7">
					<Newsfeed newsfeedRef={newsfeedRef} />{' '}
					{/* posts with comments and likes */}
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = ({
	authedUser,
	posts,
	comments,
	users,
	pets,
}: StoreObject) => {
	const postsArr: Post[] = Object.values(posts)
	const commentsArr: Comment[] = Object.values(comments)
	const usersArr: User[] = Object.values(users)
	const petsArr: Pet[] = Object.values(pets)

	return {
		authedUser,
		postsArr,
		commentsArr,
		usersArr,
		petsArr,
	}
}

export default connect(mapStateToProps)(Dashboard)
