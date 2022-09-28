import React from 'react'
import { connect } from 'react-redux'
import '../styles/user.css'
import NewPicture from './NewPicture'
import path from 'path'

const User = (props: any) => {
	const { authedUser, users, numUsers } = props

	let usersArr = []
	for (let i = 0; i < numUsers; i++) {
		usersArr.push(users[i])
	}

	const user = usersArr.find((u) => u.user_name === authedUser.user_name)
	const { user_name, first_name, last_name, profile_pic, user_id } = user

	const imagePath = path.resolve()
	console.log(imagePath)
	// !!!!!!!!!

	return (
		<div className="user m-4">
			<div className="card">
				{profile_pic && (
					<img
						src={imagePath}
						className="card-img-top img-fluid"
						alt={`${user_name} profile picture`}
					/>
				)}
				{!profile_pic && <NewPicture user_id={user_id} />}
				<div className="card-body">
					<h5 className="card-title">{`${first_name} ${last_name} (${user_name})`}</h5>
					<p className="card-text">a small paragraph about the user</p>
					<a href="#" className="btn btn-success">
						My Profile
					</a>
				</div>
			</div>
		</div>
	)
}
const mapStateToProps = ({ authedUser, users }: any) => {
	const numUsers = Object.keys(users).length
	return {
		authedUser,
		users,
		numUsers,
	}
}
export default connect(mapStateToProps)(User)
