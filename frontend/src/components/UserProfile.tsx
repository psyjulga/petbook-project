import React from 'react'
import { connect } from 'react-redux'
import { User } from '../../../backend/src/models/user'
import UserProfileRow from './UserProfileRow'

const UserProfile = (props: any) => {
	const { user } = props

	const userAllEntries = Object.entries(user)
	const userEntries = userAllEntries.slice(1, 8)

	return (
		<div className="user-profile">
			{
				<ul>
					{userEntries.map((entry) => (
						<li key={entry[0]} className="m-2">
							{/* @ts-ignore */}
							<UserProfileRow entry={entry} />
						</li>
					))}
				</ul>
			}
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
