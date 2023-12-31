import { configureStore } from '@reduxjs/toolkit'
import recipyReducer from './recipyReducer'

const store = configureStore({
    reducer: {
      recipies: recipyReducer
    },
  })
  
  export default store