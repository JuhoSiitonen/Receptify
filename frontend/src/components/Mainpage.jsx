import { Link } from 'react-router-dom'

const Mainpage = () => {

    return (
        <>
        <h2>Welcome to Receptify!</h2>
        <h3>Here you can find recipes and add your own!</h3>
        <p>Click <Link to="/recipes">here</Link> to see all recipes!</p>
        </>
    )
}

export default Mainpage