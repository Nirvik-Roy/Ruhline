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


export const getProgramEnrollments = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/customer/enrollments`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data
        }
    }
}


export const getProgramEnrollmentsById = async (enrollmentId) => {
    const token = localStorage.getItem('token')
    if (token && enrollmentId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data
        }
    }
}

export const getEnrollmentSlots = async (enrollmentId, sessionId, date) => {
    const token = localStorage.getItem('token')
    if (enrollmentId && token && sessionId && date) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/sessions/${sessionId}/available-slots?date=${date}`, {
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
        toast.error('Enrollment Id is required')
    }
}



export const rescheduleProgramApi = async (data, enrollmentId, sessionId) => {
    const token = localStorage.getItem('token')
    if (token && enrollmentId && sessionId && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/sessions/${sessionId}/reschedule`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                toast.success(res?.data?.message)
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data
        }
    }
}

export const scheduleProgramApi = async (data, enrollmentId, sessionId) => {
    const token = localStorage.getItem('token')
    if (token && enrollmentId && sessionId && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/sessions/${sessionId}/schedule`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                toast.success(res?.data?.message)
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data
        }
    }
}


export const addProgramsReview = async (data) => {
    const token = localStorage.getItem('token')
    if (token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/customer/reviews`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                toast.success(res?.data?.message)
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data
        }
    }
}


export const getProgramReviews = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/customer/reviews`, {
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
    } else {
        toast.error('Enrollment Id is required')
    }
}


export const deleteProgramReviews = async (id) => {
    const token = localStorage.getItem('token')
    if (token && id) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/customer/reviews/${id}`, {
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
    } else {
        toast.error('Enrollment Id is required')
    }
}


export const editProgramsReview = async (data, id) => {
    const token = localStorage.getItem('token')
    if (token && data && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/customer/reviews/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                toast.success(res?.data?.message)
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data
        }
    }
}


export const getProgramsModule = async (enrollmentId) => {
    const token = localStorage.getItem('token')
    if (token && enrollmentId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data
        }
    }
}


export const checkLockUnlock = async (enrollmentId, structureId) => {
    const token = localStorage.getItem('token')
    if (token && enrollmentId && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data
        }
    }
}

export const getValuesQuestions = async (enrollmentId, structureId) => {
    const token = localStorage.getItem('token')
    if (token && enrollmentId && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/values/questions`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data
        }
    }
}


export const saveValuesQuestion = async (enrollmentId, structureId, questionId, data) => {
    const token = localStorage.getItem('token')
    
    if (token && data && enrollmentId && structureId && questionId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/values/questions/${questionId}/answer`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                toast.success(res?.data?.message)
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data
        }
    }
}


export const getMotivationWords = async (enrollmentId, structureId) => {
    const token = localStorage.getItem('token')
    if (token && enrollmentId && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/find-your-motivation/words`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data
        }
    }
}


export const saveMotivationWords = async (enrollmentId, structureId, wordId, data) => {
    const token = localStorage.getItem('token')

    if (token && data && enrollmentId && structureId && wordId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/find-your-motivation/words/${wordId}/guess`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                toast.success(res?.data?.message)
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data
        }
    }
}