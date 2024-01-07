import { configureStore } from '@reduxjs/toolkit'
import recipyReducer from './recipyReducer'
import userReducer from './userReducer'

const store = configureStore({
    reducer: {
      recipies: recipyReducer,
      user: userReducer
    },
  })
  
  export default store