import { useMatch } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllComments } from "../../reducers/commentReducer"
import { getAverage } from "../../reducers/ratingReducer"
import LoadingSpinner from "../LoadingSpinner"
import SingleRecipy from "./SingleRecipy"
import RatingAverage from "./Rating/RatingAverage"
import AllComments from "./Comment/AllComments"
import UpdateRecipy from "./UpdateRecipy"
import DeleteButton from "./DeleteButton"

const ChosenRecipy = () => {
    const dispatch = useDispatch()
    const match = useMatch('/recipes/:id');
    const recipyId = Number(match?.params.id);
    const user = useSelector(state => state.user)
    const recipies = useSelector(state => state.recipies)
    const comments = useSelector(state => state.comment)

    useEffect(() => {
        dispatch(getAllComments(recipyId))
        dispatch(getAverage(recipyId))
    }, [recipyId])

    if (!recipies || !user) {
        return <LoadingSpinner />;
    }
    
    const recipy = recipies.find(recipy => recipy.id === recipyId);

    if (!recipy) {
        return <>No recipy found</>
    }

    return (
        <div> 
            <SingleRecipy recipy={recipy} />
            <AllComments comments={comments}/>
            <RatingAverage averageRating={recipy.averageRating} />
            {user && user.id === recipy.user.id && (
            <div>
              <UpdateRecipy recipy={recipy} />
              <DeleteButton recipy={recipy} />
            </div>
            )}
        </div>
    )
}

export default ChosenRecipy

