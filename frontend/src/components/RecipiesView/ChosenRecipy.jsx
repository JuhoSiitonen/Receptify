import SingleRecipy from "./SingleRecipy"
import RatingAverage from "./RatingAverage"
import AllComments from "./AllComments"
import { useSelector } from "react-redux"
import { useMatch } from "react-router-dom"
import LoadingSpinner from "../LoadingSpinner"

const ChosenRecipy = () => {
    const match = useMatch('/recipes/:id');
    const recipyId = match?.params.id;
    const recipy = useSelector(state => state.recipies.find(recipy => recipy.id === recipyId))

    if (!recipy) {
        return <LoadingSpinner />
    }

    return (
        <div>
            <SingleRecipy recipy={recipy} />
            <RatingAverage recipyId={recipy.id} />
            <AllComments recipyId={recipy.id} />
        </div>
    )
}

export default ChosenRecipy

