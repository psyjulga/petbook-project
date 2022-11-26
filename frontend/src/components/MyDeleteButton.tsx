import React, { MouseEventHandler } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

type Props = {
	destroy: MouseEventHandler
}

const MyDeleteButton = (props: Props) => {
	const { destroy } = props

	return (
		<button
			title="Delete"
			className="btn btn-success my-delete-button"
			onClick={destroy}
		>
			<FontAwesomeIcon icon={faTrash} />
		</button>
	)
}

export default MyDeleteButton
