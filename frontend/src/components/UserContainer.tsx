import React, { useState } from 'react'
import { connect } from 'react-redux'
import { User } from '../../../backend/src/models/user'
import { AuthedUser, StoreObject } from '../util/types'
import Profile from './Profile'
import ProfileButton from './ProfileButton'
import UserComponent from './UserComponent'

type Props = {
	usersArr: User[]
	authedUser: AuthedUser
}

const UserContainer = (props: Props) => {
	const { usersArr, authedUser } = props
	const { user_name } = authedUser
	const [showProfile, setShowProfile] = useState(false)

	const user = usersArr.find((u) => u.user_name === user_name)

	return (
		<div className="user-container">
			{showProfile ? (
				<Profile
					table="users"
					object={user as User}
					handleClick={() => setShowProfile(false)}
				/>
			) : (
				<UserComponent />
			)}
			<ProfileButton
				text={`${user_name}'s Profile`}
				handleClick={() => setShowProfile(true)}
			/>
		</div>
	)
}

const mapStateToProps = ({ authedUser, users }: StoreObject) => {
	const usersArr: User[] = Object.values(users)

	return {
		authedUser,
		usersArr,
	}
}

export default connect(mapStateToProps)(UserContainer)
