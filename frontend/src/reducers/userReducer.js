import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import loginService from '../services/login'
import { addNotification } from './notificationReducer'

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
            state.user.subscriptions.push(action.payload)
        },
        deleteSubscriptions(state, action) {
            const id = action.payload
            state.user.subscriptions = state.user.subscriptions.filter(f => f.id !== id)
        },
        addNewFavorite(state, action) {
            state.userFavorites?.push(action.payload)
        },
        deleteFavorites(state, action) {
            const id = action.payload
            console.log('id:', id)
            console.log('state.userFavorites:', state.userFavorites)
            state.userFavorites = state.userFavorites?.filter(f => f.id !== id)
        },
    },
})

export const { 
    setUser, 
    removeUser, 
    addNewSubscription,
    deleteSubscriptions,
    addNewFavorite,
    deleteFavorites
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
            if (loggedUserJSON) {
                const user = loggedUserJSON
                dispatch(setUser(user))
              }
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
            await userService.addSubscription(id)
            dispatch(addNewSubscription(id))
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

export default userSlice.reducer