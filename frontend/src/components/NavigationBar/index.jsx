import { Link } from 'react-router-dom'

const NavigationBar = () => {

    return (
        <div>
            <Link to="/">Mainpage  </Link>
            <Link to="/recipes">Recipes  </Link>
            <Link to="/recipes/new">Add recipe  </Link>
            <Link to="/login">Login  </Link>
            <Link to="/mypage">My page  </Link>
        </div>
    )
}

export default NavigationBar