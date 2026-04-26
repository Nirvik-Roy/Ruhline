import axios from "axios";
import toast from "react-hot-toast";

export const getPurchaseHistory = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/checkout/orders`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res?.data?.success == true) {
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data?.errors
        }
    }
}


export const getSinglePurchaseHistory = async (id) => {
    const token = localStorage.getItem('token')
    if (token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/checkout/order/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res?.data?.success == true) {
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data?.errors
        }
    }
}