import axios from "axios";
import toast from "react-hot-toast";
export const getAllCmsData = async (url) => {
    if ( url) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}${url}`);
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            // toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const getSingleCmsData = async (url,id) => {
    if (url,id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}${url}/${id}`);
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}