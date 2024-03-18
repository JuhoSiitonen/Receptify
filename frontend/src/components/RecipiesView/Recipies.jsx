import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import SingleRecipy from "./SingleRecipy"
import './SingleRecipy.css'

const Recipies = (props) => {
    const recipies = props.recipies
    const user = useSelector(state => state.user)

    return (
        <div>
            {recipies.map((recipe) => (
                <div key={recipe.id} className="single-recipe">
                    <Link to={`/recipes/${recipe.id}`}><h2>{recipe.title}</h2></Link>
                    <SingleRecipy recipy={recipe} user={user} />
                </div>
            ))}
        </div>
    )
}

export default Recipies