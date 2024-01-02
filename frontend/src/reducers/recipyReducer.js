import { createSlice } from '@reduxjs/toolkit'
import recipyService from '../services/recipies'

const recipySlice = createSlice({
    name: 'recipies',
    initialState: [],
    reducers: {
        addNewRecipy(state, action) {
            state.push(action.payload)
        },
        setRecipies(state, action) {
            return action.payload
        }
    },
})

export const { addNewRecipy, setRecipies  } = recipySlice.actions

export const createRecipy = (recipy) => {
    return async dispatch => {
        const newRecipy = await recipyService.create(recipy)
        dispatch(addNewRecipy(newRecipy))
    }
}

export const getAllRecipies = () => {
    return async dispatch => {
        const recipies = await recipyService.getAll()
        dispatch(setRecipies(recipies))
    }
}

export default recipySlice.reducer