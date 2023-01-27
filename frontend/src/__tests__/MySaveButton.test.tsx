import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import MySaveButton from '../components/MySaveButton'

describe('MySaveButton', () => {
	let mockFn: jest.Mock<any, any>

	beforeEach(() => {
		mockFn = jest.fn()
	})

	test('triggers the passed callback on click', () => {
		const { getByRole } = render(<MySaveButton onSave={mockFn} />)

		const button = getByRole('button')
		fireEvent.click(button)

		expect(mockFn).toHaveBeenCalled()
	})

	test('displays the passed title', () => {
		const { getByRole } = render(
			<MySaveButton title="test-title" onSave={mockFn} />
		)

		const button = getByRole('button')

		expect(button.getAttribute('title')).toBe('test-title')
	})

	test('displays the default title when none is passed', () => {
		const { getByRole } = render(<MySaveButton onSave={mockFn} />)

		const button = getByRole('button')

		expect(button.getAttribute('title')).toBe('Save')
	})

	test('is disabled when disabled is passed', () => {
		const { getByRole } = render(
			<MySaveButton disabled={true} onSave={mockFn} />
		)

		const button = getByRole('button')

		expect(button).toBeDisabled()
	})

	test('is enabled when disabled is not passed', () => {
		const { getByRole } = render(<MySaveButton onSave={mockFn} />)

		const button = getByRole('button')

		expect(button).not.toBeDisabled()
	})
})
