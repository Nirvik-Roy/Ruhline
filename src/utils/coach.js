import toast from "react-hot-toast";
import axios from "axios";
export const getAllCoaches = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/coaches`);
        if (res.data.success == true) {
            return res.data.data
        }
    } catch (err) {
        toast.error(err.response?.data?.message);
        return err.response.data.errors
    }
}