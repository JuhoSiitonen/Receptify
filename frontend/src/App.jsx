import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Mainpage from './components/Mainpage'
import RecipiesView from './components/RecipiesView'
import { getAllRecipies } from './reducers/recipyReducer';
import NavigationBar from './components/NavigationBar'
import AddRecipe from './components/RecipiesView/AddRecipe'
import Login from './components/Login'
import SignUp from './components/SignUp'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllRecipies())
  }, [])

  return (
    <div>
      <NavigationBar />
      <h1>Receptify!</h1>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/recipes" element={<RecipiesView />} />
        <Route path="/recipes/new" element={<AddRecipe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
