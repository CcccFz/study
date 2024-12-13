import { createSlice } from '@reduxjs/toolkit'
import { getToken, setToken, clearToken } from '@/utils' 
import { userLoginAPI, userProfileAPI } from '@/apis/user'

const store = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || '',
    userInfo: {},
  },
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload
      setToken(action.payload)
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    clearUserInfo: (state) => {
      state.token = ''
      state.userInfo = {}
      clearToken()
    }
  },
})

const { setUserToken, setUserInfo, clearUserInfo } = store.actions

const fetchLogin = (data) => async (dispatch) => {
  const res = await userLoginAPI(data)
  dispatch(setUserToken(res.data.token))
}

const fetchUserInfo = () => async (dispatch) => {
  const res = await userProfileAPI()
  dispatch(setUserInfo(res.data))
}

export { fetchLogin, fetchUserInfo, clearUserInfo }
export default store.reducer
