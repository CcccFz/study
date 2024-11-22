import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const store = createSlice({
  name: "bill",
  initialState: {
    bills: [],
  },
  reducers: {
    setBills(state, action) {
      state.bills = action.payload
    },
    pushBill(state, action) {
      state.bills.push(action.payload)
    }
  }
})

const { setBills, pushBill } = store.actions

export const fetchBills = () => async (dispatch) => {
  const res = await axios.get("http://localhost:8888/ka")
  dispatch(setBills(res.data))
}

export const addBill = (data) => async (dispatch) => {
  const res = await axios.post("http://localhost:8888/ka", data)
  dispatch(pushBill(res.data))
}

export default store.reducer
