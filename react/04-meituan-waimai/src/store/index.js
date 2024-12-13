import { configureStore } from '@reduxjs/toolkit'
import foodReducer from './modules/food'

export default configureStore({
  reducer: {
    food: foodReducer
  }
})
