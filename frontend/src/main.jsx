import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import reduxStore from './reducers/store'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </Router>
)