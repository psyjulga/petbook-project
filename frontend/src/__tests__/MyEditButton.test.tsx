import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import MyEditButton from '../components/MyEditButton'

describe('MyEditButton', () => {
	let mockFn: jest.Mock<any, any>

	beforeEach(() => {
		mockFn = jest.fn()
	})

	test('triggers the passed callback on click', () => {
		const { getByRole } = render(<MyEditButton onEdit={mockFn} />)

		const button = getByRole('button')
		fireEvent.click(button)

		expect(mockFn).toHaveBeenCalled()
	})

	test('displays the passed title', () => {
		const { getByRole } = render(
			<MyEditButton title="test-title" onEdit={mockFn} />
		)

		const button = getByRole('button')

		expect(button.getAttribute('title')).toBe('test-title')
	})

	test('displays the default title when none is passed', () => {
		const { getByRole } = render(<MyEditButton onEdit={mockFn} />)

		const button = getByRole('button')

		expect(button.getAttribute('title')).toBe('Edit')
	})

	test('has the default class when none is passed', () => {
		const { getByRole } = render(<MyEditButton onEdit={mockFn} />)

		const button = getByRole('button')

		expect(button.getAttribute('class')).toBe('my-button-green')
	})

	test('has the passed class', () => {
		const { getByRole } = render(
			<MyEditButton myClass="test-class" onEdit={mockFn} />
		)

		const button = getByRole('button')

		expect(button.getAttribute('class')).toBe('test-class')
	})
})
