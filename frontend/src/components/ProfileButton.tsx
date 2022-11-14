import React, { MouseEventHandler } from 'react'
import '../styles/styles.css'

type Props = {
	text: string
	handleClick: MouseEventHandler
	buttonStyle: string
}

const ProfileButton = (props: Props) => {
	const { text, handleClick, buttonStyle } = props

	return (
		<button
			onClick={handleClick}
			className={`profile-back-button btn ${buttonStyle}`}
		>
			{text}
		</button>
	)
}

export default ProfileButton
