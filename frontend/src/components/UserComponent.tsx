import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import NewPicture from './NewPicture'
import { User } from '../../../backend/src/models/user'

const UserComponent = (props: any) => {
	// current logged in user
	const { user } = props
	const { user_name, first_name, last_name, profile_pic, user_id } = user

	return (
		<div className="user m-4">
			<div className="card">
				{profile_pic && (
					<img
						src={window.location.origin + `/images/${profile_pic}`}
						className="card-img-top img-fluid"
						alt={`${user_name} profile picture`}
					/>
				)}
				{!profile_pic && <NewPicture user_id={user_id} />}
				<div className="card-body">
					<h5 className="card-title">{`${first_name} ${last_name} (${user_name})`}</h5>
					<p className="card-text">a small paragraph about the user</p>
					<Link className="btn btn-success" to={'/user_profile'}>
						My Profile
					</Link>
				</div>
			</div>
		</div>
	)
}
const mapStateToProps = ({ authedUser, users }: any) => {
	const usersArr: User[] = Object.values(users)
	// @ts-ignore
	const user: User = usersArr.find((u) => u.user_name === authedUser.user_name)

	return {
		user,
	}
}
export default connect(mapStateToProps)(UserComponent)
