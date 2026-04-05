import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoginModal: false,
};

const GlobalLoginSlice = createSlice({
    name: "globalLogin",
    initialState,
    reducers: {
        OpenglobalLogin: (state) => {
            state.isLoginModal = true;
        },
        closeGlobalLogin: (state) => {
            state.isLoginModal = false;
        },
    },
});

export const { OpenglobalLogin, closeGlobalLogin } = GlobalLoginSlice.actions;
export default GlobalLoginSlice.reducer;