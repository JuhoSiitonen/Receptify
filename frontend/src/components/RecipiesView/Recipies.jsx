import { Link } from "react-router-dom"
import SingleRecipy from "./SingleRecipy"
import Togglable from "../Togglable"
import Comment from "./Comment"
import Rating from "./Rating"

const Recipies = ({ recipies }) => {
    return (
        <div>
            {recipies.map((recipe) => (
                <div key={recipe.id}>
                    <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                    <SingleRecipy recipy={recipe} />
                    <Togglable buttonLabel="Comment">
                        <Comment recipyId={recipe.id} />
                    </Togglable>
                    <Togglable buttonLabel="Rate">
                        <Rating  recipyId={recipe.id} />
                    </Togglable>
                </div>
            ))}
        </div>
    )
}

export default Recipies