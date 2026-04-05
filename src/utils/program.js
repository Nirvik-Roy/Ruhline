import toast from "react-hot-toast";
import axios from "axios";
export const getProgramCategory = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program-category?nested=1`);
        if (res.data.success == true) {
            return res.data.data
        }
    } catch (err) {
        toast.error(err.response?.data?.message);
        return err.response.data.errors
    }
}

export const getProgramsByCategory = async (categoryId) => {
    if (categoryId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/programs/category/${categoryId}`);
            if (res.data.success == true) {
                return res.data.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    } else {
        toast.error('Reuired data not found...')
    }

}


export const getSingleProgram = async (programId) => {
    if (programId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/programs/${programId}`);
            if (res.data.success == true) {
                return res.data.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    } else {
        toast.error('Reuired data not found...')
    }

}
