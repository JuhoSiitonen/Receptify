import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import reduxStore from './reducers/store'
import App from './App'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
 
  const { worker } = await import('./mocks/browser')
 
  return worker.start()
}

enableMocking().then(() => {
  
  ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <Provider store={reduxStore}>
        <App />
      </Provider>
    </Router>
  )
})
