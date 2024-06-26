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
        fetchMoreRecipies(state, action) {
            return state.concat(action.payload)
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
            const { id, newRating } = action.payload
            const recipy = state.find(r => r.id === id)
            recipy.averageRating = newRating
        },
        incrementFavorites(state, action) {
            const { id } = action.payload
            const recipy = state.find(r => r.id === id)
            let oldFavorites = recipy.favorites
            recipy.favorites = oldFavorites + 1
        },
        decrementFavorites(state, action) {
            const { id } = action.payload
            const recipy = state.find(r => r.id === id)
            let oldFavorites = recipy.favorites
            recipy.favorites = oldFavorites - 1
        },
    },
})

export const { 
    addNewRecipy, 
    setRecipies, 
    updateExistingRecipy, 
    removeRecipy, 
    updateRecipyRating, 
    fetchMoreRecipies,
    incrementFavorites,
    decrementFavorites
 } = recipySlice.actions

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

export const getAllRecipies = (query, favorites, subscribed, length) => {
    return async dispatch => {
        length = length || 0
        try {
            const recipies = await recipyService.getAll(query, length, favorites, subscribed)
            if (length !== 0) {
                dispatch(fetchMoreRecipies(recipies))
            } else {
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

export const updateRating = (id, newRating) => {
    return async dispatch => {
        const updatedRating = { id, newRating }
        dispatch(updateRecipyRating(updatedRating))
    }
}

export const userRecipies = (id, length) => {
    return async dispatch => {
        let recipies
        length = length || 0
        try {
            recipies = await userService.getUserRecipies(id, length)
            if (length !== 0) {
                dispatch(fetchMoreRecipies(recipies))
            } else {
                dispatch(setRecipies(recipies))
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export const recipySearch = (ingredients) => {
    return async dispatch => {
        try {
            const recipies = await recipyService.search(ingredients)
            dispatch(setRecipies(recipies))
            return recipies
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export const addAFavorite = (id) => {
    return async dispatch => {
        try {
            dispatch(incrementFavorites({id}))
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export const removeAFavorite = (id) => {
    return async dispatch => {
        try {
            dispatch(decrementFavorites({id}))
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export default recipySlice.reducer