import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import SingleRecipy from "./SingleRecipy"
import Togglable from "../Togglable"
import Comment from "./Comment"
import Rating from "./Rating"
import FavoriteButton from "./FavoriteButton"

const Recipies = (props) => {
    const recipies = props.recipies
    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    const userActions = ( recipe, user ) => {
        return (
            <div>
                {!props.inViewUser && (
                    <button onClick={() => navigate(`/users/${recipe.user.id}/view`)}>View User
                    </button>
                )}
                <FavoriteButton recipyId={recipe.id} user={user} />
                <Togglable buttonLabel="Comment">
                    <Comment recipyId={recipe.id} />
                </Togglable>
                 <Togglable buttonLabel="Rate">
                    <Rating  recipyId={recipe.id} />
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
                    {user && user.id !== recipe.user.id && userActions(recipe, user)}
                </div>
            ))}
        </div>
    )
}

export default Recipies