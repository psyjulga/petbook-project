import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProfileButton from '../components/ProfileButton'

describe('ProfileButton', () => {
	let mockFn: jest.Mock<any, any>
	let rendered: RenderResult<
		typeof import('@testing-library/dom/types/queries'),
		HTMLElement,
		HTMLElement
	>

	beforeEach(() => {
		mockFn = jest.fn()
		rendered = render(
			<ProfileButton
				text="test-text"
				handleClick={mockFn}
				buttonStyle="test-style"
			/>
		)
	})

	test('triggers the passed callback on click', () => {
		const button = rendered.getByRole('button')
		fireEvent.click(button)

		expect(mockFn).toHaveBeenCalled()
	})

	test('displays the passed text', () => {
		const button = rendered.getByText('test-text')

		expect(button).toBeTruthy()
	})

	test('adds the passed style to the class', () => {
		const button = rendered.getByRole('button')

		expect(button.getAttribute('class')).toBe(
			'profile-back-button btn test-style'
		)
	})
})
