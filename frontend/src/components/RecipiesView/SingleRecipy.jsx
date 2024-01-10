import { Link } from "react-router-dom"
import Togglable from "../Togglable"
import Comment from "./Comment"
import Rating from "./Rating"

const SingleRecipy = ({ recipy }) => {
    console.log(recipy)
    return (
        <div className="singleRecipy">
            <Link to={`/recipes/${recipy.id}`}>{recipy.title}</Link>
            <h2>{recipy.title}</h2>
            <p>{recipy.description}</p>
            <p>Ingredients:</p>
            <ul>
              {recipy.recipy_ingredients.map(ingredient => (
                <li key={ingredient.id}>
                  {ingredient.amount} of {ingredient.ingredient.name}
                </li>
              ))}
            </ul>
            <p>{recipy.instructions}</p>
            <Togglable buttonLabel="Comment">
              <Comment recipyId={recipy.id} />
            </Togglable>
            <Togglable buttonLabel="Rate">
              <Rating  recipyId={recipy.id} />
            </Togglable>
        </div>
    )
}

export default SingleRecipy