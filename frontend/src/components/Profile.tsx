import React, { MouseEventHandler } from 'react'
import { User } from '../../../backend/src/models/user'
import { Pet } from '../../../backend/src/models/pet'
import ProfileRow from './ProfileRow'
import ProfileButton from './ProfileButton'
import '../styles/styles.css'

type Props = {
	table: 'users' | 'pets'
	object: User | Pet
	handleClick: MouseEventHandler
}

const Profile = (props: Props) => {
	const { table, object, handleClick } = props

	const entries = Object.entries(object)
	// id and password (user) not shown / editable
	const entriesWithoutId = entries.slice(1, 9)

	return (
		<div className="profile">
			<div className="border border-3 border-success border-opacity-25 rounded">
				{
					<ul className="mt-4 me-4">
						{entriesWithoutId.map((entry) => (
							<li key={entry[0]} className="m-2">
								<ProfileRow entry={entry} object={object} table={table} />
							</li>
						))}
					</ul>
				}
			</div>
			<div className="button-container text-center mt-2">
				<ProfileButton
					text="Go back / display changes"
					handleClick={handleClick}
					buttonStyle="btn-success"
				/>
			</div>
		</div>
	)
}

export default Profile
