import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../components/Login'

test('renders content', () => {
    const mockHandler = jest.fn()
    const component = render(
        <Login handleLogin={mockHandler} />
    )
    expect(component.container).toHaveTextContent('Username')
    expect(component.container).toHaveTextContent('Password')
    expect(component.container).toHaveTextContent('Login')
})
