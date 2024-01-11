import { useMatch } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllComments } from "../../reducers/commentReducer"
import LoadingSpinner from "../LoadingSpinner"
import SingleRecipy from "./SingleRecipy"
import RatingAverage from "./RatingAverage"
import AllComments from "./AllComments"
import { getAverage } from "../../reducers/ratingReducer"

const ChosenRecipy = () => {
    const dispatch = useDispatch()
    const match = useMatch('/recipes/:id');
    const recipyId = Number(match?.params.id);
    const recipies = useSelector(state => state.recipies)

    useEffect(() => {
        dispatch(getAllComments(recipyId))
        dispatch(getAverage(recipyId))
    }, [])

    if (!recipies) {
        return <LoadingSpinner />;
    }
    
    const recipy = recipies.find(recipy => recipy.id === recipyId);

    return (
        <div> 
            <SingleRecipy recipy={recipy} />
            <AllComments />
        </div>
    )
}

export default ChosenRecipy

