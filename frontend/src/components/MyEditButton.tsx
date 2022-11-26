import React, { MouseEventHandler } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

type Props = {
	onEdit: MouseEventHandler
	myClass?: string
}

const MyEditButton = (props: Props) => {
	const { onEdit, myClass } = props

	return (
		<button
			title="Edit"
			className={myClass ? myClass : 'my-button-green'}
			onClick={onEdit}
		>
			<FontAwesomeIcon icon={faPen} />
		</button>
	)
}

export default MyEditButton
