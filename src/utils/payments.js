import axios from "axios";
import toast from "react-hot-toast";

export const postPreview = async (data) => {
    const token = localStorage.getItem('token')
    if (data && token) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/checkout/preview`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}