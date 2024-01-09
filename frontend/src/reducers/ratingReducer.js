import { createSlice } from '@reduxjs/toolkit'
import ratingService from '../services/rating'

const ratingSlice = createSlice({
    name: 'rating',
    initialState: null,
    reducers: {
        setRating(state, action) {
            return action.payload
        },
        removeRating(state, action) {
            return null
        }
    },
})

export const { setRating, removeRating } = ratingSlice.actions

export const createRating = (id, newObject) => {
    return async dispatch => {
        const rating = await ratingService.create(id, newObject)
        dispatch(setRating(rating))
    }
}

export const getAverage = (id) => {
    return async dispatch => {
        const ratings = await ratingService.getRatingAverage(id)
        dispatch(setRating(ratings))
    }
}

export default ratingSlice.reducer