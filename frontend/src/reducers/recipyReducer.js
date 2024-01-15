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
        },
        updateExistingRecipy(state, action) {
            const recipy = action.payload
            return state.map(r => r.id !== recipy.id ? r : recipy)
        },
        removeRecipy(state, action) {
            const id = action.payload
            return state.filter(r => r.id !== id)
        }
    },
})

export const { addNewRecipy, setRecipies, updateExistingRecipy, removeRecipy  } = recipySlice.actions

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

export const updateRecipy = (id, recipy) => {
    return async dispatch => {
        try {
            const updatedRecipy = await recipyService.update(id, recipy)
            dispatch(updateExistingRecipy(updatedRecipy))
            dispatch(addNotification({message: 'Recipy updated', error: false}))
        } catch (error) {
            dispatch(addNotification({message: 'Recipy could not be updated', error: true}))
            console.log(error)
            throw error
        }
    }
}

export const deleteRecipy = (id) => {
    return async dispatch => {
        try {
            await recipyService.deleteRecipy(id)
            dispatch(removeRecipy(id))
            dispatch(addNotification({message: 'Recipy deleted', error: false}))
        } catch (error) {
            dispatch(addNotification({message: 'Recipy could not be deleted', error: true}))
            console.log(error)
            throw error
        }
    }
}

export default recipySlice.reducer