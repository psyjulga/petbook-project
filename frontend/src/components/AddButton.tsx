import React, { MouseEventHandler } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'

type Props = {
	onAdd: MouseEventHandler
}

const AddButton = (props: Props) => {
	const { onAdd } = props

	return (
		<button
			title="Add a Comment"
			className="new-comment-button btn btn-success"
			onClick={onAdd}
		>
			<FontAwesomeIcon icon={faCommentDots} />
		</button>
	)
}

export default AddButton
