import axios from "axios";
import { toast } from "react-hot-toast";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const Authregister = createAsyncThunk('Authregister', async (profileData, { rejectWithValue }) => {
    console.log(profileData)
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/customer/register`, profileData,)

        if (res?.data.success) {
            // toast.success('User Profile Added Successfully');
            localStorage.setItem('userEmail',`${res.data?.data?.user?.email}`);
            // localStorage.setItem('isChecking',true)
            return res.data.data;
        }
    } catch (err) {
        toast.error(err.response?.data?.message || err.message);
        return rejectWithValue(err.response?.data?.errors || "Something went wrong");
    }

})
