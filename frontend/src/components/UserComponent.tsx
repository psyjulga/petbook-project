import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { User } from '../../../backend/src/models/user'
import { StoreObject } from '../util/types'
import NewPicture from './NewPicture'
import '../styles/styles.css'

type Props = {
	user?: User
}

const UserComponent = (props: Props) => {
	// current logged in user
	const { user } = props
	const {
		user_name,
		first_name,
		last_name,
		about_paragraph,
		profile_pic,
		user_id,
	} = user as User

	return (
		<section className="user m-3">
			<div className="card card-user">
				{profile_pic && (
					<img
						src={window.location.origin + `/images/${profile_pic}`}
						className="card-img-top img-fluid"
						alt={`${user_name} profile picture`}
					/>
				)}
				{!profile_pic && <NewPicture id={user_id as number} table={'users'} />}
				<div className="card-body">
					<h5 className="card-title">{`${first_name} ${last_name} (${user_name})`}</h5>
					<p className="card-text">{about_paragraph}</p>
				</div>
			</div>
		</section>
	)
}
const mapStateToProps = ({ authedUser, users }: StoreObject) => {
	const usersArr: User[] = Object.values(users)
	const user: User | undefined = usersArr.find(
		(u) => u.user_name === authedUser.user_name
	)

	return {
		user,
	}
}
export default connect(mapStateToProps)(UserComponent)
