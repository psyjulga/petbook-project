import React from 'react'
import { connect } from 'react-redux'
import '../styles/user.css'

const User = (props: any) => {
	const { authedUser, users, numUsers } = props

	let usersArr = []
	for (let i = 0; i < numUsers; i++) {
		usersArr.push(users[i])
	}

	const user = usersArr.find((u) => u.user_name === authedUser.user_name)

	const { user_name, first_name, last_name } = user

	return (
		<div className="user m-4">
			<div className="card">
				<img
					src="http://placekitten.com/80/40"
					className="card-img-top img-fluid"
					alt={`${user_name} profile picture`}
				/>
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
