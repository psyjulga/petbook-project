import React, { MouseEventHandler } from 'react'

type Props = {
	onEdit: MouseEventHandler
	symbol: string
	myClass?: string | null
	disabled?: boolean | null
}

const MyEditButton = (props: Props) => {
	const { onEdit, symbol, myClass, disabled } = props

	return (
		<button
			className={myClass ? myClass : 'my-edit-button'}
			onClick={onEdit}
			disabled={disabled !== null ? disabled : false}
		>
			{symbol}
		</button>
	)
}

export default MyEditButton
