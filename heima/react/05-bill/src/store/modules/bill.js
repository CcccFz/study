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
    }
  }
})

const { setBills } = store.actions
export const fetchBills = () => async (dispatch) => {
  const res = await axios.get("http://localhost:8888/ka")
  dispatch(setBills(res.data))
}

export default store.reducer
