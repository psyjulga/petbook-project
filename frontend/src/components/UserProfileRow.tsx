import React from 'react'

const UserProfileRow = ({ entry }: any) => {
	return (
		<div className="user-profile-row row">
			<div className="col">{entry[0]}</div>
			<div className="col">{entry[1]}</div>
			<div className="col">
				<button className="btn btn-success">Edit</button>
			</div>
		</div>
	)
}

export default UserProfileRow
