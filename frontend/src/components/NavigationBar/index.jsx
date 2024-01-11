import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../reducers/userReducer'

const NavigationBar = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleLogout = () => {    
        dispatch(logout())
    }

    if (user === null) {
        return (
            <div>
                <Link to="/">Mainpage  </Link>
                <Link to="/recipes">Recipes  </Link>
                <Link to="/login">Login  </Link>
                <Link to="/signup">Sign up  </Link>
            </div>
        )
    }

    return (
        <div>
            <Link to="/">Mainpage  </Link>
            <Link to="/recipes">Recipes  </Link>
            <Link to="/recipes/new">Add recipe  </Link>
            <Link to="/mypage">My page  </Link>
            <Link to="/logout" onClick={handleLogout}>Logout </Link>
        </div>
    )
}

export default NavigationBar