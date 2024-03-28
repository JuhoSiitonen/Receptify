import { configureStore } from '@reduxjs/toolkit'
import recipyReducer from './recipyReducer'
import userReducer from './userReducer'
import notificationReducer from './notificationReducer'
import commentReducer from './commentReducer'

const reduxStore = configureStore({
    reducer: {
      recipies: recipyReducer,
      user: userReducer,
      notification: notificationReducer,
      comment: commentReducer,
    },
  })
  
  export default reduxStore