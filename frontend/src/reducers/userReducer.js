import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
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
        try {
            const user = await loginService.login(credentials)
            window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
            dispatch(setUser(user))
        } catch (error) {
            console.log(error)
        }
    }
}

export const isUserLogged = () => {
    return (dispatch) => {
      const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        dispatch(setUser(user))
      }
    }
  }

export const logout = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedAppUser')
        dispatch(removeUser())
        console.log('logout')
    }
}

export const signup = (credentials) => {
    return async dispatch => {
        try {
            const user = await userService.signup(credentials)
            dispatch(login(credentials))
            dispatch(setUser(user))
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export default userSlice.reducer