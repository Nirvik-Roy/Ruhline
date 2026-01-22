import axios from "axios";
import { toast } from "react-hot-toast";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const Resendmail = createAsyncThunk('Resendmail', async (emailData, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/customer/email/resend-verification`, emailData,)
        if (res?.data.success) {
            toast.success(res?.data?.data?.message);
            return res.data.data;
        }
    } catch (err) {
        console.log(err)
        toast.error(err.response?.data?.message || err.message || "Something went wrong");
        return rejectWithValue(err.response?.data?.errors || "Something went wrong");
    }

})
