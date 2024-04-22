import React from 'react'
import '@testing-library/jest-dom'

import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../components/Login'

import { renderWithProviders } from '../util/test-utils'
import { customRender } from '../util/test-utils'
import { server } from './testServer'
import { act } from 'react-dom/test-utils'


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
    act(() => {
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    })

    const loginButton = screen.getByRole('button', { name: /login/i });
    userEvent.click(loginButton);

    
    await waitFor(() => {
      expect(screen.getByText(/Welcome to Receptify!/i)).toBeInTheDocument();
      });
    
})
