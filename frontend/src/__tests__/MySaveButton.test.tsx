import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import MySaveButton from '../components/MySaveButton'

describe('MySaveButton', () => {
	test('triggers the passed callback on click', () => {
		const mockFn = jest.fn()

		const { getByRole } = render(<MySaveButton onSave={mockFn} />)

		const button = getByRole('button')
		fireEvent.click(button)

		expect(mockFn).toHaveBeenCalled()
	})
})

// const MySaveButton = (props: Props) => {
// 	const { onSave, disabled, title } = props

// 	return (
// 		<button
// 			className="my-button-purple"
// 			title={title ? title : 'Save'}
// 			onClick={onSave}
// 			disabled={disabled !== null ? disabled : false}
// 		>
// 			<FontAwesomeIcon icon={faFloppyDisk} />
// 		</button>
// 	)
// }
