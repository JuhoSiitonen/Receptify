import { useDispatch, useSelector } from 'react-redux'
import { createRating } from '../../../reducers/ratingReducer'

const Rating = ({ recipyId }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.rating.value)
        const ratingObject = {
            rating: e.target.rating.value,
            userId: user.id,
        }
        dispatch(createRating(recipyId, ratingObject))
    }

    return (
        <div>
            Rating
            <form onSubmit={handleSubmit}> 
                <input type="radio" id="1" name="rating" value="1" />
                <label htmlFor="1">1</label>
                <input type="radio" id="2" name="rating" value="2" />
                <label htmlFor="2">2</label>
                <input type="radio" id="3" name="rating" value="3" />
                <label htmlFor="3">3</label>
                <input type="radio" id="4" name="rating" value="4" />
                <label htmlFor="4">4</label>
                <input type="radio" id="5" name="rating" value="5" />
                <label htmlFor="5">5</label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Rating