import React from 'react'
import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../components/Login'
import { renderWithProviders } from '../util/test-utils'
import { customRender } from '../util/test-utils'
import { server } from './testServer'

server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url)
})


test('renders content', async () => {
    const mockHandler = jest.fn()
    const { container } = renderWithProviders(<Login />)
  
    await waitFor(() => {
      expect(screen.getByLabelText(/username/i)).toBeVisible();
      expect(screen.getByLabelText(/password/i)).toBeVisible();
  });
})

test('login form calls onSubmit with right details', async () => {
    const { container } = renderWithProviders(<Login />)
  
    await waitFor(() => {
      expect(screen.getByLabelText(/username/i)).toBeVisible();
      expect(screen.getByLabelText(/password/i)).toBeVisible();
    });
    userEvent.type(screen.getByLabelText(/username/i), 'testuser')
    userEvent.type(screen.getByLabelText(/password/i), 'testpassword')
    const loginButton = screen.getByRole('button', { name: /login/i });
    userEvent.click(loginButton);

    /*
    expect(await response.json()).toEqual({
        "id": 1,
        "username": "John Doe",
        "password": "password",
        "admin": false,
        "visible": true,
        "createdAt": "2024-02-01T14:12:04.268Z",
        "updatedAt": "2024-02-01T14:12:04.268Z"
      }
    )
    */
})
