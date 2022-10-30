import React, { MouseEventHandler } from 'react'

type Props = {
	edit: MouseEventHandler
}

const EditButton = (props: Props) => {
	const { edit } = props

	return (
		<button className="btn btn-success edit-button" onClick={edit}>
			🖍
		</button>
	)
}

export default EditButton
