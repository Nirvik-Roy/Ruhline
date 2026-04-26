import toast from "react-hot-toast";
import axios from "axios";
export const getCountries = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/location/countries`);
        if (res?.data?.success == true) {
            return res?.data?.data
        }
    } catch (err) {
        toast.error(err.response?.data?.message);
        return err?.response?.data?.errors
    }
}

export const getStates = async (id) => {
    if (id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/location/countries/${id}/states`);
            if (res?.data?.success == true) {
                return res?.data?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data?.errors
        }
    }
}

export const getCities = async (id) => {
    if (id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/location/states/${id}/cities`);
            if (res?.data?.success == true) {
                return res?.data?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data?.errors
        }
    }
}


export const getPhoneCountryCode = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/location/phone-country-codes`);
        if (res?.data?.success == true) {
            return res?.data?.data
        }
    } catch (err) {
        toast.error(err.response?.data?.message);
        return err?.response?.data?.errors
    }

}