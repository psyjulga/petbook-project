import React, { MouseEventHandler } from 'react'

type Props = {
	text: string
	handleClick: MouseEventHandler
}

const ProfileButton = (props: Props) => {
	const { text, handleClick } = props

	return (
		<button onClick={handleClick} className="profile-button btn btn-success">
			{text}
		</button>
	)
}

export default ProfileButton
