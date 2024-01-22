import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { createRating } from '../../../reducers/ratingReducer'
import { updateRating } from '../../../reducers/recipyReducer'


const Rating = ({ recipyId }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user) 

    const handleSubmit = async (e) => {
        e.preventDefault()
        const ratingObject = {
            rating: e.target.rating.value,
            userId: user.id,
        }
        const response = await dispatch(createRating(recipyId, ratingObject))
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