import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        removeUser(state, action) {
            return null
        }
    },
})

export const { setUser, removeUser } = userSlice.actions

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

export default userSlice.reducer