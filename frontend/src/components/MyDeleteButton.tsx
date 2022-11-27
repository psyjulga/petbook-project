import React, { MouseEventHandler } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

type Props = {
	destroy: MouseEventHandler
	title?: string
}

const MyDeleteButton = (props: Props) => {
	const { destroy, title } = props

	return (
		<button
			title={title ? title : 'Delete'}
			className="my-delete-button"
			onClick={destroy}
		>
			<FontAwesomeIcon icon={faTrash} />
		</button>
	)
}

export default MyDeleteButton
