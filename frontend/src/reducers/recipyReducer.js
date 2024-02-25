import { createSlice } from '@reduxjs/toolkit'
import recipyService from '../services/recipies'
import userService from '../services/users'
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
        },
        updateRecipyRating(state, action) {
            const { id, rating } = action.payload
            const recipy = state.find(r => r.id === id)
            recipy.averageRating = rating
        }
    },
})

export const { addNewRecipy, setRecipies, updateExistingRecipy, removeRecipy, updateRecipyRating  } = recipySlice.actions

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

export const getAllRecipies = (query, favorites) => {
    return async dispatch => {
        try {
            if (favorites) {
                const recipies = await recipyService.getFavorites()
                dispatch(setRecipies(recipies))
                return
            } else{
                const recipies = await recipyService.getAll(query)
                dispatch(setRecipies(recipies))
            }
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

export const updateRating = (id, rating) => {
    return async dispatch => {
        try {
            const updatedRating = { id, rating }
            dispatch(updateRecipyRating(updatedRating))
        } catch (error) {
            throw error
        }
    }
}

export const userRecipies = (id) => {
    return async dispatch => {
        try {
            const recipies = await userService.getUserRecipies(id)
            dispatch(setRecipies(recipies))
        } catch (error) {
            throw error
        }
    }
}


export default recipySlice.reducer