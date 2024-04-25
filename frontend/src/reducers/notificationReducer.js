import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    error: false
  },
  reducers: {
    addNewNotification(state, action) {
      state.message = action.payload.message
      state.error = action.payload.error
    },
    removeNotification(state) {
      state.message = ''
      state.error = false
      }
    },
  })

export const { addNewNotification, removeNotification } =
  notificationSlice.actions

export const addNotification = ({message, error}) => {
  return async dispatch => {
    await dispatch(addNewNotification({
      message, error}))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 4000)
  }
}

export default notificationSlice.reducer