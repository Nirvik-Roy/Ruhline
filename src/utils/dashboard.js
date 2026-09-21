import axios from "axios";
import toast from "react-hot-toast";

export const getDashboardData = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/customer/dashboard`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res?.data?.success == true) {
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data
        }
    } else {
        toast.error('Unauthenticated')
    }
}

export const getNotes = async (params = {}) => {
    const token = localStorage.getItem('token')
    if (token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/customer/notes`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                params: {
                    page: params.page || 1,
                    per_page: params.per_page || 15
                }
            });
            if (res?.data?.success == true) {
                return res?.data?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data
        }
    } else {
        toast.error('Unauthenticated')
    }
}

export const getNote = async (id) => {
    const token = localStorage.getItem('token')
    if (token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/customer/notes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            if (res?.data?.success == true) {
                return res?.data?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data
        }
    } else {
        toast.error('Unauthenticated')
    }
}

export const createNote = async (data) => {
    const token = localStorage.getItem('token')
    if (token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/customer/notes`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (res?.data?.success == true) {
                toast.success(res?.data?.message)
                return res?.data?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data
        }
    } else {
        toast.error('Unauthenticated')
    }
}

export const updateNote = async (data, id) => {
    const token = localStorage.getItem('token')
    if (token && data && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/customer/notes/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (res?.data?.success == true) {
                toast.success(res?.data?.message)
                return res?.data?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data
        }
    } else {
        toast.error('Unauthenticated')
    }
}

export const deleteNote = async (id) => {
    const token = localStorage.getItem('token')
    if (token && id) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/customer/notes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            if (res?.data?.success == true) {
                toast.success(res?.data?.message)
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data
        }
    } else {
        toast.error('Unauthenticated')
    }
}
