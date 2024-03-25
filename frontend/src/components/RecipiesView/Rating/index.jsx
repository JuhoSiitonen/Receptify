import { useDispatch, useSelector } from 'react-redux'
import { createRating } from '../../../reducers/ratingReducer'
import './rating.css'

const Rating = ({ recipyId }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user) 

    const handleSubmit = async (e) => {
        e.preventDefault()
        const ratingObject = {
            rating: e.target.rating.value,
            userId: user.id,
        }
        await dispatch(createRating(recipyId, ratingObject))
    }

    return (       
        <div>
            <form onSubmit={handleSubmit}> 
            <div className="rating">
              <input type="radio" name="rating" value="5" id="5"/><label htmlFor="5">☆</label>
              <input type="radio" name="rating" value="4" id="4"/><label htmlFor="4">☆</label>
              <input type="radio" name="rating" value="3" id="3"/><label htmlFor="3">☆</label>
              <input type="radio" name="rating" value="2" id="2"/><label htmlFor="2">☆</label>
              <input type="radio" name="rating" value="1" checked id="1"/><label htmlFor="1">☆</label>            
            </div>
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Rating