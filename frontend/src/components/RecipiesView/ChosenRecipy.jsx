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
    const recipyId = match?.params.id;

    useEffect(() => {
        dispatch(getAllComments(recipyId))
        dispatch(getAverage(recipyId))
    }, [])

    const comments = useSelector(state => state.comments)
    const ratingAverage = useSelector(state => state.ratingAverage)
    
    console.log(recipyId)
    const recipy = useSelector(state => state.recipies.find(recipy => recipy.id === recipyId))
    const recipies = useSelector(state => state.recipies)
    console.log(recipies)
    console.log(recipy)

    if (!recipy) {
        return <LoadingSpinner />
    }

    return (
        <div>
            <SingleRecipy recipy={recipy} />
            <RatingAverage recipyId={ratingAverage} />
            <AllComments recipyId={comments} />
        </div>
    )
}

export default ChosenRecipy

