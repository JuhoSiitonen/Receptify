import { Link } from 'react-router-dom'

const Mainpage = () => {
    return (
        <>
        <h2>First component!</h2>
        <Link to="/recipes">Recipes</Link>
        </>
    )
}

export default Mainpage