import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/Loginslice/AuthSlice";
import GlobalLoginSlice from './Slices/Loginslice/GlobalLoginSlice'
const store = configureStore({
  reducer: {
    auth: AuthSlice,
    globalLogin: GlobalLoginSlice
  }
})

export default store;