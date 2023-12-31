import { Routes, Route } from 'react-router-dom'
import Mainpage from './components/Mainpage'
import RecipiesView from './components/RecipiesView'

function App() {

  return (
    <div>
      <h1>Receptify!</h1>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/recipes" element={<RecipiesView />} />
      </Routes>
    </div>
  )
}

export default App
