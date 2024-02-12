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
        addNewFriend(state, action) {
            state.friends.push(action.payload)
        },
        deleteFriend(state, action) {
            const id = action.payload
            state.friends = state.friends.filter(f => f.id !== id)
        }
    },
})

export const { setUser, removeUser } = userSlice.actions

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

export const addFriend = (id) => {
    return async dispatch => {
        try {
            await userService.addFriend(id)
            dispatch(addNewFriend(id))
            dispatch(addNotification({
                message: 'Friend added', 
                error: false}));
        } catch (error) {
            dispatch(addNotification({
                message: 'Friend could not be added', 
                error: true}));
            console.log(error)
            throw error
        }
    }
}

export const deleteFriend = (id) => {
    return async dispatch => {
        try {
            await userService.deleteFriend(id)
            dispatch(deleteFriend(id))
            dispatch(addNotification({
                message: 'Friend deleted', 
                error: false}));
        } catch (error) {
            dispatch(addNotification({
                message: 'Friend could not be deleted', 
                error: true}));
            console.log(error)
            throw error
        }
    }
}

export default userSlice.reducer