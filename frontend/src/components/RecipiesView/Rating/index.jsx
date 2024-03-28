import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { createRating, updateExistingRating } from '../../../reducers/userReducer'
import './rating.css'

const Rating = ({ recipyId, user }) => {
    const dispatch = useDispatch()
    const [alreadyRated, setAlreadyRated] = useState(
        user.rated.some(rating => rating.recipyId === recipyId)
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        const ratingObject = {
            rating: e.target.rating.value,
            userId: user.id,
        }

        if (alreadyRated) {
            console.log("already rated")
            await dispatch(updateExistingRating(recipyId, ratingObject))
        } else {
            console.log("not rated")
            await dispatch(createRating(recipyId, ratingObject))
            setAlreadyRated(true)
        }
    }

    return (       
        <div>
            <form onSubmit={handleSubmit}> 
            <div className="rating">
              <input type="radio" name="rating" value="5" id="5"/><label htmlFor="5">☆</label>
              <input type="radio" name="rating" value="4" id="4"/><label htmlFor="4">☆</label>
              <input type="radio" name="rating" value="3" id="3"/><label htmlFor="3">☆</label>
              <input type="radio" name="rating" value="2" id="2"/><label htmlFor="2">☆</label>
              <input type="radio" name="rating" value="1" defaultChecked id="1"/><label htmlFor="1">☆</label>            
            </div>
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Rating