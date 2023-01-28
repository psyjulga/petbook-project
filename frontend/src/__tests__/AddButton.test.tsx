import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddButton from '../components/AddButton'

describe('AddButton', () => {
	test('triggers the passed callback on click', () => {
		const mockFn = jest.fn()

		const { getByRole } = render(<AddButton onAdd={mockFn} />)

		const button = getByRole('button')
		fireEvent.click(button)

		expect(mockFn).toHaveBeenCalled()
	})
})
