import { Routes, Route } from 'react-router-dom'
import Mainpage from './components/Mainpage'

function App() {

  return (
    <div>
      <h1>Receptify!</h1>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/recipes" element={<h1>Recipes</h1>} />
      </Routes>
    </div>
  )
}

export default App
