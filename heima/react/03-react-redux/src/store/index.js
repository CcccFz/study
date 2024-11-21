import { configureStore } from "@reduxjs/toolkit"
import countReducer from './modules/countStore'
import channelReducer from './modules/channelStore'

export default configureStore({
  reducer: {
    count: countReducer,
    channel: channelReducer,
  }
})