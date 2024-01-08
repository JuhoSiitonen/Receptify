import { configureStore } from '@reduxjs/toolkit'
import recipyReducer from './recipyReducer'
import userReducer from './userReducer'
import notificationReducer from './notificationReducer'

const store = configureStore({
    reducer: {
      recipies: recipyReducer,
      user: userReducer,
      notification: notificationReducer
    },
  })
  
  export default store