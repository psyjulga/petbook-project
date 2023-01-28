import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import MyDeleteButton from '../components/MyDeleteButton'

describe('MyDeleteButton', () => {
	let mockFn: jest.Mock<any, any>

	beforeEach(() => {
		mockFn = jest.fn()
	})

	test('triggers the passed callback on click', () => {
		const { getByRole } = render(<MyDeleteButton destroy={mockFn} />)

		const button = getByRole('button')
		fireEvent.click(button)

		expect(mockFn).toHaveBeenCalled()
	})

	test('displays the passed title', () => {
		const { getByRole } = render(
			<MyDeleteButton title="test-title" destroy={mockFn} />
		)

		const button = getByRole('button')

		expect(button.getAttribute('title')).toBe('test-title')
	})

	test('displays the default title when none is passed', () => {
		const { getByRole } = render(<MyDeleteButton destroy={mockFn} />)

		const button = getByRole('button')

		expect(button.getAttribute('title')).toBe('Delete')
	})
})
