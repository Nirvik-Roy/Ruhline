import axios from "axios";
import { toast } from "react-hot-toast";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const Autoverify = createAsyncThunk('Autoverify', async (verificationData, { rejectWithValue }) => {
    if (verificationData) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/customer/email/verify`, verificationData)
            if (res?.data.success) {
                toast.success(res?.data?.message)
                console.log(res.data.success)
                localStorage.removeItem('isChecking')
                return res.data.data;
            }
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || err.message || 'Profile Add/Update Failed');
            return rejectWithValue(err.response?.data || "Something went wrong");
        }
    }
})
