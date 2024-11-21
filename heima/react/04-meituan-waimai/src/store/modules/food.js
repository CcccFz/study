import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const store = createSlice({
  name: 'food',
  initialState: {
    foods: [],
    menuIdx: 0,
    cartList: []
  },
  reducers: {
    setFoods(state, action) {
      state.foods = action.payload
    },
    setMenuIdx(state, action) {
      state.menuIdx = action.payload
    },
    addCart(state, action) {
      const item = state.cartList.find(item => item.id === action.payload.id)
      if (item) {
        item.count++
        return
      }
      action.payload.count = 1
      state.cartList.push(action.payload)
    },
    increCount(state, action) {
      const item = state.cartList.find(item => item.id === action.payload.id)
      if (!item) return
      item.count++
    },
    decreCount(state, action) {
      const idx = state.cartList.findIndex(item => item.id === action.payload.id)
      if (idx < 0) return
      if (--state.cartList[idx].count > 0) return
      state.cartList.splice(idx, 1)
    },
    clearCart(state) {
      state.cartList = []
    },
  }
})


const { setFoods } = store.actions
export const fetchFoods = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:3006/takeaway')
    dispatch(setFoods(res.data))
  }
}

export const { setMenuIdx, addCart, increCount, decreCount, clearCart } = store.actions
export default store.reducer
