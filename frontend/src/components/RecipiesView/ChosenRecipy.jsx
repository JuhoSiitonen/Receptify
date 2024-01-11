import { useMatch } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllComments } from "../../reducers/commentReducer"
import { getAverage } from "../../reducers/ratingReducer"
import LoadingSpinner from "../LoadingSpinner"
import SingleRecipy from "./SingleRecipy"
import RatingAverage from "./RatingAverage"
import AllComments from "./AllComments"


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
    const comments = useSelector(state => state.comment)
    const ratingAverage = useSelector(state => state.rating)

    return (
        <div> 
            <SingleRecipy recipy={recipy} />
            <AllComments comments={comments}/>
            <RatingAverage ratingAverage={ratingAverage} />
        </div>
    )
}

export default ChosenRecipy

