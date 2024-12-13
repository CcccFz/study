import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const channelStore = createSlice({
    name: 'channel',
    initialState: {
      channels: [],
    },
    reducers: {
      setChannels: (state, action) => {
        state.channels = action.payload
      }
    }
})

const { setChannels } = channelStore.actions

export const fetchChannels = () => {
  return async (dispatch) => {
    const res = await axios.get('http://geek.itheima.net/v1_0/channels')
    dispatch(setChannels(res.data.data.channels))
  }
}

export default channelStore.reducer
