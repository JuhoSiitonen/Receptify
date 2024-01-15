import { createSlice } from '@reduxjs/toolkit'
import recipyService from '../services/recipies'
import { addNotification } from './notificationReducer'

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
        try {
            const newRecipy = await recipyService.create(recipy)
            dispatch(addNewRecipy(newRecipy))
            dispatch(addNotification({message: 'Recipy added', error: false}))
        } catch (error) {
            dispatch(addNotification({message: 'Recipy could not be added', error: true}))
            console.log(error)
            throw error
        }
    }
}

export const getAllRecipies = () => {
    return async dispatch => {
        try {
            const recipies = await recipyService.getAll()
            dispatch(setRecipies(recipies))
        } catch (error) {
            console.log(error)
        }
    }
}

export default recipySlice.reducer