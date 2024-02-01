import React from 'react'
import { http, HttpResponse, delay } from 'msw'
import { setupServer } from 'msw/node'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../components/Login'
import { renderWithProviders } from '../util/test-utils'
import { customRender } from '../util/test-utils'
import Mainpage from '../components/Mainpage'

export const handlers = [
    http.get('/api/login', async () => {
      await delay(150)
      return HttpResponse.json('John Smith')
    })
  ]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test('renders content', async () => {
    const mockHandler = jest.fn()
    //const { container } = customRender(<Login />)
    //const { container } = renderWithProviders(<div>Username</div>)
    //render(<Mainpage />)
    //const { container } = renderWithProviders(<Mainpage />)
    const { container } = renderWithProviders(<Login />)
    
    /*
    expect(container).toHaveTextContent('Username')
    expect(container).toHaveTextContent('Password')
    expect(container).toHaveTextContent('Login')
    

  expect(screen.getByText('Username')).toBeInTheDocument();
  expect(screen.getByText('Password')).toBeInTheDocument();
  expect(screen.getByText('Login')).toBeInTheDocument();
  */

  await waitFor(() => {
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
})
