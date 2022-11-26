import React, { MouseEventHandler } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

type Props = {
	onSave: MouseEventHandler

	disabled?: boolean | null
}

const MySaveButton = (props: Props) => {
	const { onSave, disabled } = props

	return (
		<button
			className="my-button-purple"
			onClick={onSave}
			disabled={disabled !== null ? disabled : false}
		>
			<FontAwesomeIcon icon={faFloppyDisk} />
		</button>
	)
}

export default MySaveButton
