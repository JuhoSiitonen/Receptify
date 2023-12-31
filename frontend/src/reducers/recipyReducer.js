import { createSlice } from '@reduxjs/toolkit'
import recipyService from '../services/recipies'

const recipySlice = createSlice({
    name: 'recipies',
    initialState: [],
    reducers: {
        setRecipies(state, action) {
            return action.payload
        }
    },
})

export const { setRecipies } = recipySlice.actions

export const getAllRecipies = () => {
    return async dispatch => {
        const recipies = await recipyService.getAll()
        dispatch(setRecipies(recipies))
    }
}

export default recipySlice.reducer