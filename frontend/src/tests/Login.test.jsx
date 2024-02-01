import React from 'react'
import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../components/Login'
import { renderWithProviders } from '../util/test-utils'
import { customRender } from '../util/test-utils'
import { server } from './testServer'


test('renders content', async () => {
    const mockHandler = jest.fn()
    const { container } = renderWithProviders(<Login />)
  
    await waitFor(() => {
      expect(screen.getByLabelText(/username/i)).toBeVisible();
      expect(screen.getByLabelText(/password/i)).toBeVisible();
  });
  
})
