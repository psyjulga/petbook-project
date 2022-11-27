import React, { ChangeEventHandler } from 'react'

type Props = {
	input: string
	onChange: ChangeEventHandler
}

const Input = (props: Props) => {
	const { input, onChange } = props

	return (
		<input className="me-2" value={input} type="text" onChange={onChange} />
	)
}

export default Input
