import { Routes, Route } from 'react-router-dom'
import Mainpage from './components/Mainpage'

function App() {

  return (
    <div>
      <h1>Receptify!</h1>
      <Routes>
        <Route path="/" element={<Mainpage />} />
      </Routes>
    </div>
  )
}

export default App
