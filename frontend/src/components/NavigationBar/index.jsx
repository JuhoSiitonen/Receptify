import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../reducers/userReducer'
import './Navigationbar.css'

const NavigationBar = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleLogout = () => {    
        dispatch(logout())
    }

    if (user === null) {
        return (
            <div className="navigation-bar">
                <Link to="/" className="navigation-link">Mainpage</Link>
                <Link to="/login" className="navigation-link">Login</Link>
                <Link to="/signup" className="navigation-link">Sign up</Link>
            </div>
        )
    }

    return (
        <div className="navigation-bar">
            <Link to="/" className="navigation-link">Mainpage</Link>
            <Link to="/recipes" className="navigation-link">Recipes</Link>
            <Link to="/recipes/new" className="navigation-link">Add recipe</Link>
            <Link to="/recipyfinder" className="navigation-link">Find recipes</Link>
            <Link to="/mypage" className="navigation-link">My page</Link>
            <Link to="/shoppinglist" className="navigation-link">Shoppinglist</Link>
            <Link to="/logout" className="navigation-link" onClick={handleLogout}>Logout</Link>
        </div>
    )
}

export default NavigationBar