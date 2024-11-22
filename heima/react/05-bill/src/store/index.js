import { configureStore } from "@reduxjs/toolkit";
import bill from "./modules/bill";

export default configureStore({
  reducer: {
    bill
  }
})
