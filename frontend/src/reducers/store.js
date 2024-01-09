import { configureStore } from '@reduxjs/toolkit'
import recipyReducer from './recipyReducer'
import userReducer from './userReducer'
import notificationReducer from './notificationReducer'
import ratingReducer from './ratingReducer'
import commentReducer from './commentReducer'

const store = configureStore({
    reducer: {
      recipies: recipyReducer,
      user: userReducer,
      notification: notificationReducer,
      rating: ratingReducer,
      comment: commentReducer,
    },
  })
  
  export default store