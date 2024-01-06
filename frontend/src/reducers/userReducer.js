import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/users'

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
        newUser(state, action) {
            return action.payload
        }
    },
})

export const { setUser, removeUser, newUser } = userSlice.actions

export const login = (credentials) => {
    return async dispatch => {
        const user = await loginService.login(credentials)
        dispatch(setUser(user))
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch(removeUser())
    }
}

export const signup = (credentials) => {
    return async dispatch => {
        console.log(credentials)
        const user = await loginService.signup(credentials)
        dispatch(newUser(user))
    }
}

export default userSlice.reducer