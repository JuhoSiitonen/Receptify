import { useMatch } from "react-router-dom"
import { useSelector } from "react-redux"
import LoadingSpinner from "../LoadingSpinner"
import SingleRecipy from "./SingleRecipy"
import UpdateRecipy from "./UpdateRecipy"
import './SingleRecipy.css'

const ChosenRecipy = () => {
    const match = useMatch('/recipes/:id');
    const recipyId = Number(match?.params.id);
    const user = useSelector(state => state.user)
    const recipies = useSelector(state => state.recipies)
 
    if (!recipies || !user) {
        return <LoadingSpinner />;
    }
    
    const recipy = recipies.find(recipy => recipy.id === recipyId);

    if (!recipy) {
        return <>No recipy found</>
    }

    return (
        <div>
            <div className="single-recipe">
              <SingleRecipy recipy={recipy} />
            </div>
            {user && user.id === recipy.owner.id && (
            <div>
              <UpdateRecipy recipy={recipy} />
            </div>
            )}
        </div>
    )
}

export default ChosenRecipy

