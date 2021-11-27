import { configureStore } from "@reduxjs/toolkit";
import refuelingReducer from "./refuelingSlice";

export default configureStore({
  reducer: {
    refueling: refuelingReducer,
  },
});
