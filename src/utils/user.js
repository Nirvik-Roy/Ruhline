import toast from "react-hot-toast";
import axios from "axios";
export const Changeuserpassword = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/customer/change-password`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res?.data?.success == true) {
                toast.success(res.data?.message || 'Password Update Successfully');
                return res?.data?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data?.errors
        }
    }
}


export const getUserProfile = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/customer/me`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res?.data?.success == true) {
                return res?.data?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data?.errors
        }
    }
}


export const editProfile = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/customer/update-profile`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res?.data?.success == true) {
                toast.success(res.data?.message || 'Password Update Successfully');
                return res?.data?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data?.errors
        }
    }
}

export const userForgetPassword = async (data) => {
    if (data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/customer/forgot-password`, data);
            if (res?.data?.success == true) {
                toast.success(res.data?.message || 'Password Update Successfully');
                return res?.data?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data?.errors
        }
    }
}