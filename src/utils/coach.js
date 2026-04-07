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


export const getProgamSpecificCoaches = async ( programId ) => {
    const token = localStorage.getItem('token')
    if (programId && token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/programs/${programId}/facilitators`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                return res.data.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }else{
        toast.error('Program Id is required')
    }
}


export const getProgamCoachSlots = async (programId, coachId, date) => {
    const token = localStorage.getItem('token')
    if (programId && token && coachId && date) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/programs/${programId}/facilitators/${coachId}/slots?date=${date}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                return res.data.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    } else {
        toast.error('Program Id is required')
    }
}