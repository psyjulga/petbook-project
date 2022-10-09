import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { User } from '../../../backend/src/models/user'
import UserProfileRow from './UserProfileRow'
import '../styles/styles.css'

const UserProfile = (props: any) => {
	const { user } = props

	const userAllEntries = Object.entries(user)
	// user_id and password not shown / editable
	const userEntries = userAllEntries.slice(1, 9)

	return (
		<div className="user-profile mb-5">
			<div className="m-5 border border-3 border-success border-opacity-25 rounded">
				{
					<ul className="mt-4 me-4">
						{userEntries.map((entry) => (
							<li key={entry[0]} className="m-2">
								{/* @ts-ignore */}
								<UserProfileRow entry={entry} user={user} />
							</li>
						))}
					</ul>
				}
			</div>
			<Link
				className="btn btn-success m-5 user-profile-back-buttton"
				to={'/newsfeed'}
			>
				Back to Newsfeed
			</Link>
		</div>
	)
}

const mapStateToProps = ({ users, authedUser }: any) => {
	const usersArr: User[] = Object.values(users)
	// @ts-ignore
	const user: User = usersArr.find((u) => u.user_name === authedUser.user_name)
	return {
		user,
	}
}

export default connect(mapStateToProps)(UserProfile)
