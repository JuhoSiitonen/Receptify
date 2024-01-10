import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Mainpage from './components/Mainpage'
import RecipiesView from './components/RecipiesView'
import { getAllRecipies } from './reducers/recipyReducer';
import { isUserLogged, logout } from './reducers/userReducer'
import NavigationBar from './components/NavigationBar'
import AddRecipe from './components/RecipiesView/AddRecipe'
import Login from './components/Login'
import SignUp from './components/SignUp'
import UserPage from './components/UserPage'
import Notifications from './components/Notifications'
import ChosenRecipy from './components/RecipiesView/ChosenRecipy'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllRecipies())
    dispatch(isUserLogged())
  }, [])

  return (
    <div>
      <NavigationBar />
      <Notifications />
      <h1>Receptify!</h1>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/recipes" element={<RecipiesView />} />
        <Route path="/recipes/new" element={<AddRecipe />} />
        <Route path="/recipes/:id" element={<ChosenRecipy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<UserPage />} />
        <Route path="/logout" element={<Login />} 
        action={() => dispatch(logout())} />
      </Routes>
    </div>
  )
}

export default App
