import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addNewNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    },
  },
})

export const { addNewNotification, removeNotification } =
  notificationSlice.actions

export const addNotification = (content) => {
  return (dispatch) => {
    dispatch(addNewNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer