import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import reduxStore from '../reducers/store'

export function renderWithProviders(
    ui,
  {
    store = reduxStore,
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
        <Provider store={store}>
          <BrowserRouter>{children}</BrowserRouter>
        </Provider>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export const AllTheProviders = ({children}) => {
    return (
      <BrowserRouter>
        <Provider store={reduxStore}>
          {children}
        </Provider>
      </BrowserRouter>
    ) 
  }

  export const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})
   