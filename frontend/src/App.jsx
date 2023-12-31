import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Mainpage from './components/Mainpage'
import RecipiesView from './components/RecipiesView'
import { getAllRecipies } from './reducers/recipyReducer';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllRecipies())
  }, [])

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
