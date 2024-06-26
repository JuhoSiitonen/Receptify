import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { isUserLogged } from './reducers/userReducer'
import Mainpage from './components/Mainpage'
import RecipiesView from './components/RecipiesView'
import NavigationBar from './components/NavigationBar'
import AddRecipe from './components/RecipiesView/AddRecipe'
import Login from './components/Login'
import SignUp from './components/SignUp'
import UserPage from './components/UserPage'
import Notifications from './components/Notifications'
import ChosenRecipy from './components/RecipiesView/ChosenRecipy'
import RecipyFinder from './components/RecipyFinder'
import ViewUser from './components/RecipiesView/ViewUser'
import Shoppinglist from './components/Shoppinglist'
import './styles/App.css'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(isUserLogged())
  }, [])

  return (
    <div>
      <NavigationBar />
      <h1 className='receptify-header'>Receptify!</h1>
      <Notifications />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/recipes" element={<RecipiesView />} />
          <Route path="/recipes/new" element={<AddRecipe />} />
          <Route path="/recipes/:id" element={<ChosenRecipy />} />
          <Route path="/recipyfinder" element={<RecipyFinder />} />
          <Route path="/users/:id/view" element={<ViewUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<UserPage />} />
          <Route path="/shoppinglist" element={<Shoppinglist />} />
          <Route path="/logout" element={<Login />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
