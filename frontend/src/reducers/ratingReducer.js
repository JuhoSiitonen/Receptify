import { createSlice } from '@reduxjs/toolkit'
import ratingService from '../services/rating'
import { addNotification } from './notificationReducer'

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
        try {
            const rating = await ratingService.create(id, newObject)
            dispatch(addNotification({ message: 'Rating added successfully!', error: false }))
        } catch (error) {
            dispatch(addNotification({ message: 'Rating could not be added!', error: true }))
            console.log(error)
            throw error
        }
    }
}

export const getAverage = (id) => {
    return async dispatch => {
        try {
            const ratings = await ratingService.getRatingAverage(id)
            dispatch(setRating(ratings))
            console.log(ratings)
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export default ratingSlice.reducer