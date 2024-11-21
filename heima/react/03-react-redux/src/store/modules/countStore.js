import { createSlice } from "@reduxjs/toolkit"

const countStore = createSlice({
    name: "count",
    initialState: {
      count: 0
    },
    reducers: {
      increment: (state) => {
        state.count++
      },
      decrement: (state) => {
        state.count--
      },
      addNum: (state, action) => {
        state.count += action.payload
      }
    }
})

export const { increment, decrement, addNum } = countStore.actions
export default countStore.reducer