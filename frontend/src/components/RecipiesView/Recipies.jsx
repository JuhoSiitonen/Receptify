import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import SingleRecipy from "./SingleRecipy"
import Togglable from "../Togglable"
import Comment from "./Comment"
import Rating from "./Rating"

const Recipies = ({ recipies }) => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    const userActions = ({ id, user }) => {
        const handleViewUser = () => {
            navigate(`/users/${user.id}/view`)
        }
        return (
            <div>
                <button onClick={handleViewUser}>View User</button>
                <Togglable buttonLabel="Comment">
                    <Comment recipyId={id} />
                </Togglable>
                 <Togglable buttonLabel="Rate">
                    <Rating  recipyId={id} />
                </Togglable>
            </div>
        )
    }

    return (
        <div>
            {recipies.map((recipe) => (
                <div key={recipe.id}>
                    <Link to={`/recipes/${recipe.id}`}><h2>{recipe.title}</h2></Link>
                    <SingleRecipy recipy={recipe} />
                    {user && user.id !== recipe.user.id && userActions(recipe)}
                </div>
            ))}
        </div>
    )
}

export default Recipies