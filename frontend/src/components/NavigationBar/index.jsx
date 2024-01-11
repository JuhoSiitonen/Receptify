import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../reducers/userReducer'

const NavigationBar = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {    
        dispatch(logout())
    }

    return (
        <div>
            <Link to="/">Mainpage  </Link>
            <Link to="/recipes">Recipes  </Link>
            <Link to="/recipes/new">Add recipe  </Link>
            <Link to="/login">Login  </Link>
            <Link to="/mypage">My page  </Link>
            <Link to="/logout" onClick={handleLogout}>Logout </Link>
        </div>
    )
}

export default NavigationBar