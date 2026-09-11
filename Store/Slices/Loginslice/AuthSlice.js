import axios from "axios";
import { toast } from "react-hot-toast";
import { Authregister } from './RegisterSlice'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Autoverify } from "./AutoVerfiySlice";
import { Resendmail } from "./ResendMail";
export const Auth = createAsyncThunk('Auth', async (loginParams, { rejectWithValue }) => {
    if (loginParams) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/customer/login`, loginParams);
            if (res?.data?.success == true) {
                toast.success(res.data?.message || 'Login Success');
                return res?.data?.data
            }
        } catch (err) {
            // toast.error(err.response?.data?.data.errors?.email[0])
            toast.error(err.response?.data?.errors?.email[0])
            console.log(err?.response?.data)
            return rejectWithValue(err.response?.data?.errors || "Something went wrong");
        }
    }
})

export const AuthlogOut = createAsyncThunk('AuthlogOut', async (loginParams, { rejectWithValue }) => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/customer/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res?.data?.success == true) {
                toast.success(res.data?.message || 'Logut Success');
                localStorage.removeItem('token')
                return res?.data?.data
            }
        } catch (err) {
            // toast.error(err.response?.data?.message)
            localStorage.removeItem('token')
            return rejectWithValue(err.response?.data || "Something went wrong");
        }
    } else {
        toast.error('Unauthenticated...')
        return rejectWithValue("Something went wrong");
    }

})



const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: false,
        isLoading: false,
        isChecking: true,
        errors: '',
        isRegistration: false,
        isVerified: false,
        isVerifyChecking: false,
        loginerrors: '',
        resendErrors: '',
    },
    reducers: {
        verifyToken(state) {
            const token = localStorage.getItem("token");
            const expiry = Number(localStorage.getItem("expiry"));

            if (token && expiry && Date.now() < expiry) {
                state.isLogin = true;
                state.isChecking = false;
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("expiry");
                state.isLogin = false;
                state.isChecking = false;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(Auth.pending, (state) => {
            state.isLoading = true;
            state.isLogin = false;
            state.errors = '';
            state.loginerrors = '';
            state.resendErrors = '';

        })
        builder.addCase(Authregister.pending, (state) => {
            state.isLoading = true;
            state.isRegistration = false,
                state.errors = '';
            state.loginerrors = '';
            state.resendErrors = '';
        })
        builder.addCase(Authregister.fulfilled, (state) => {
            state.isLoading = false;
            state.isRegistration = true;
            state.errors = ''
            state.errors = '';
            state.loginerrors = '';
            state.resendErrors = '';
        })
        builder.addCase(Authregister.rejected, (state, action) => {
            state.isLoading = false;
            state.isRegistration = false;
            state.errors = action.payload
        })

        builder.addCase(AuthlogOut.pending, (state) => {
            state.isLoading = true;
            state.isLogin = true;
            state.errors = '';
            state.loginerrors = '';
            state.resendErrors = '';
        })
        builder.addCase(AuthlogOut.fulfilled, (state) => {
            state.isLoading = false;
            state.isLogin = false;
            state.errors = '';
            state.loginerrors = '';
            state.resendErrors = '';
        })
        builder.addCase(AuthlogOut.rejected, (state) => {
            state.isLoading = false;
            state.isLogin = false;
        })

        builder.addCase(Autoverify.pending, (state) => {
            state.isVerified = false,
                state.isVerifyChecking = true
            state.errors = '';
            state.loginerrors = '';
            state.resendErrors = '';
        })

        builder.addCase(Autoverify.fulfilled, (state) => {
            state.isVerified = true,
                state.isVerifyChecking = false,
                state.isRegistration = false,
                state.errors = '';
            state.loginerrors = '';
            state.resendErrors = '';
        })
        builder.addCase(Autoverify.rejected, (state) => {
            state.isVerified = false,
                state.isVerifyChecking = false
        })

        builder.addCase(Auth.fulfilled, (state, action) => {
            if (action.payload.token) {
                state.isLogin = true;
                state.isLoading = false;
                state.loginerrors = '';
                state.errors = '';
                state.loginerrors = '';
                state.resendErrors = '';
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem("expiry", Date.now() + 24 * 60 * 60 * 1000);

            }
        })
        builder.addCase(Auth.rejected, (state, action) => {
            state.isLoading = false;
            state.isLogin = false;
            state.loginerrors = action.payload
        })

        builder.addCase(Resendmail.pending, (state) => {
            state.resendErrors = '',
                state.errors = '';
            state.loginerrors = '';
            state.resendErrors = '';
        })
        builder.addCase(Resendmail.fulfilled, (state) => {
            state.resendErrors = '',
                state.errors = '';
            state.loginerrors = '';
            state.resendErrors = '';
        })
        builder.addCase(Resendmail.rejected, (state, action) => {
            state.resendErrors = action.payload
        })
    }
})
export const { verifyToken } = AuthSlice.actions
export default AuthSlice.reducer;