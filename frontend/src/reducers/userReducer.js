import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import loginService from '../services/login'
import ratingService from '../services/rating'
import { addNotification } from './notificationReducer'
import { updateRating, addAFavorite, removeAFavorite } from './recipyReducer'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        removeUser(state, action) {
            return null
        },
        addNewSubscription(state, action) {
            state.subscriptions?.push(action.payload)
        },
        deleteSubscriptions(state, action) {
            const id = action.payload
            state.subscriptions = state.subscriptions?.filter(f => f.id !== id)
        },
        addNewFavorite(state, action) {
            state.userFavorites?.push(action.payload)
        },
        deleteFavorites(state, action) {
            const id = action.payload
            state.userFavorites = state.userFavorites?.filter(f => f.id !== id)
        },
        newUserRating(state, action) {
            state.rated.push(action.payload)
        },
        updateUserRating(state, action) {
            const { recipyId, rating } = action.payload
            const rated = state.rated.find(r => r.recipyId === recipyId)
            rated.rating = rating
        },
        addToShoppinglistItem(state, action) {
            const items = action.payload
            items.map(item => 
                state.shoppinglist.push(item)
           )
        },
        removeShoppinglistItem(state, action) {
            const id = action.payload
            state.shoppinglist = state.shoppinglist.filter(i => i.id !== id)
        },
        editAboutMeInfo(state, action) {
            state.about = action.payload.aboutMe
        },
        editEmailAddress(state, action) {
            state.email = true
        }
    },
})

export const { 
    setUser, 
    removeUser, 
    addNewSubscription,
    deleteSubscriptions,
    addNewFavorite,
    deleteFavorites,
    newUserRating,
    updateUserRating,
    addToShoppinglistItem,
    removeShoppinglistItem,
    editAboutMeInfo,
    editEmailAddress
 } = userSlice.actions

export const login = (credentials) => {
    return async dispatch => {
        try {
            const user = await loginService.login(credentials)
            dispatch(addNotification({ message: 'Login successful!', error: false }))
            dispatch(setUser(user))
        } catch (error) {
            dispatch(addNotification({ message: 'Wrong credentials!', error: true }))
            console.log(error)
            throw error
        }
    }
}

export const isUserLogged = () => {
    return async dispatch => {
        try {
            const loggedUserJSON = await userService.session()
            if (Object.keys(loggedUserJSON).length === 0 && loggedUserJSON.constructor === Object) {
                return 
              }
            const user = loggedUserJSON
            dispatch(setUser(user))
        } catch (error) {}
    }
  }

export const logout = () => {
    return async dispatch => {
        await userService.logoutUser()
        dispatch(removeUser())
        console.log('logout')
    }
}

export const signup = (credentials) => {
    return async dispatch => {
        try {
            const user = await userService.signup(credentials)
            dispatch(login(credentials))
            dispatch(addNotification({
                message: 'Sign up successful!', 
                error: false}));
            dispatch(setUser(user))
        } catch (error) {
            dispatch(addNotification({
                message: 'Username already in use!', 
                error: true}));
            console.log(error)
            throw error
        }
    }
}

export const deleteUser = (id) => {
    return async dispatch => {
        try {
            await userService.deleteUser(id)
            dispatch(removeUser())
            dispatch(addNotification({
                message: 'User deleted', 
                error: false}));
        } catch (error) {
            dispatch(addNotification({
                message: 'User could not be deleted', 
                error: true}));
            console.log(error)
            throw error
        }
    }
}

export const addSubscription = (id) => {
    return async dispatch => {
        try {
            const newSubscription = await userService.addSubscription(id)
            dispatch(addNewSubscription(newSubscription))
            dispatch(addNotification({
                message: 'Subscription added', 
                error: false}));
        } catch (error) {
            dispatch(addNotification({
                message: `${error.response.data.error}`, 
                error: true}));
            throw error
        }
    }
}

export const deleteSubscription = (id) => {
    return async dispatch => {
        try {
            await userService.deleteSubscription(id)
            dispatch(deleteSubscriptions(id))
            dispatch(addNotification({
                message: 'Subscription deleted', 
                error: false}));
        } catch (error) {
            dispatch(addNotification({
                message: 'Subscription could not be deleted', 
                error: true}));
            console.log(error)
            throw error
        }
    }
}

export const addFavorite = (id) => {
    return async dispatch => {
        try {
            const newFavorite = await userService.addFavorite(id)
            console.log('newFavorite:', newFavorite)
            dispatch(addNewFavorite(newFavorite))
            dispatch(addAFavorite(id))
            //dispatch(incrementFavorites(id))
            dispatch(addNotification({
                message: 'Favorite added', 
                error: false}));
        } catch (error) {
            dispatch(addNotification({
                message: 'Favorite could not be added', 
                error: true}));
            console.log(error)
            throw error
        }
    }
}

export const deleteFavorite = (id) => {
    return async dispatch => {
        try {
            await userService.deleteFavorite(id)
            dispatch(deleteFavorites(id))
            dispatch(removeAFavorite(id))
            //dispatch(decrementFavorites(id))
            dispatch(addNotification({
                message: 'Favorite deleted', 
                error: false}));
        } catch (error) {
            dispatch(addNotification({
                message: 'Favorite could not be deleted', 
                error: true}));
            console.log(error)
            throw error
        }
    }
}

export const createRating = (id, rating) => {
    return async dispatch => {
        try {
            const newRating = await ratingService.create(id, rating)
            dispatch(updateRating(id, newRating))
            const userRating = { recipyId: id, rating: rating.rating }
            dispatch(newUserRating(userRating))
            dispatch(addNotification({ message: 'Rating added successfully!', error: false }))
        } catch (error) {
            dispatch(addNotification({ message: 'Rating could not be added!', error: true }))
            console.log(error)
            throw error
        }
    }
}

export const updateExistingRating = (id, rating) => {
    return async dispatch => {
        try {
            const newRating = await ratingService.update(id, rating)
            dispatch(updateRating(id, newRating))
            const userRating = { recipyId: id, rating: rating.rating }
            dispatch(updateUserRating(userRating))
            dispatch(addNotification({ message: 'Rating updated successfully!', error: false }))
        } catch (error) {
            dispatch(addNotification({ message: 'Rating could not be updated!', error: true }))
            console.log(error)
            throw error
        }
    }
}

export const addToShoppinglist = (shoppinglist) => {
    return async dispatch => {
        try {
            await userService.addShoppinglistItem(shoppinglist)
            dispatch(addToShoppinglistItem(shoppinglist))
            dispatch(addNotification({ message: 'Added to shoppinglist!', error: false }))
        } catch (error) {
            dispatch(addNotification({ message: 'Could not add to shoppinglist!', error: true }))
            console.log(error)
            throw error
        }
    }
}

export const deleteFromShoppinglist = (id) => {
    return async dispatch => {
        try {
            await userService.deleteShoppinglistItem(id)
            dispatch(removeShoppinglistItem(id))
            dispatch(addNotification({ message: 'Removed from shoppinglist!', error: false }))
        } catch (error) {
            dispatch(addNotification({ message: 'Could not remove from shoppinglist!', error: true }))
            console.log(error)
            throw error
        }
    }
}

export const sendShoppinglistItems = (items) => {
    return async dispatch => {
        try {
            await userService.sendShoppinglist(items)
            dispatch(addNotification({ message: 'Shoppinglist sent!', error: false }))
        } catch (error) {
            dispatch(addNotification({ message: 'Could not send shoppinglist!', error: true }))
            console.log(error)
            throw error
        }
    }
}

export const editAboutMe = (about) => {
    return async dispatch => {
        try {
            await userService.editAbout(about)
            dispatch(editAboutMeInfo(about))
            dispatch(addNotification({ message: 'About me updated!', error: false }))
        } catch (error) {
            dispatch(addNotification({ message: 'Could not update about me!', error: true }))
            console.log(error)
            throw error
        }
    }
}

export const editEmail = (email) => {
    return async dispatch => {
        try {
            await userService.editEmail(email)
            dispatch(editEmailAddress())
            dispatch(addNotification({ message: 'Email updated!', error: false }))
        } catch (error) {
            dispatch(addNotification({ message: 'Could not update email!', error: true }))
            console.log(error)
            throw error
        }
    }
}

export default userSlice.reducer