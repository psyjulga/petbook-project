import React, { MouseEventHandler } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

type Props = {
	onSave: MouseEventHandler
	disabled?: boolean | null
	title?: string
}

const MySaveButton = (props: Props) => {
	const { onSave, disabled, title } = props

	return (
		<button
			className="my-button-purple"
			title={title ? title : 'Save'}
			onClick={onSave}
			disabled={disabled !== null ? disabled : false}
		>
			<FontAwesomeIcon icon={faFloppyDisk} />
		</button>
	)
}

export default MySaveButton
