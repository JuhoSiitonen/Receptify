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
                    <SingleRecipy recipy={recipe} user={user} />
                </div>
            ))}
        </div>
    )
}

export default Recipies