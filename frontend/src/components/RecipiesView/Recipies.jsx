import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import SingleRecipy from "./SingleRecipy"
import Togglable from "../Togglable"
import Comment from "./Comment"
import Rating from "./Rating"

const Recipies = ({ recipies }) => {
    const user = useSelector(state => state.user)

    const userActions = ({ id }) => {

        return (
            <div>
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
                    <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                    <SingleRecipy recipy={recipe} />
                    {user && user.id !== recipe.user.id && userActions(recipe)}
                </div>
            ))}
        </div>
    )
}

export default Recipies