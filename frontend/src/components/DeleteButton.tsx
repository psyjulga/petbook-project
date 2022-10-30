import React, { MouseEventHandler } from 'react'

type Props = {
	destroy: MouseEventHandler
}

const DeleteButton = (props: Props) => {
	const { destroy } = props

	return (
		<button className="btn btn-success delete-button" onClick={destroy}>
			❌
		</button>
	)
}

export default DeleteButton
