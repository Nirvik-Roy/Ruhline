import toast from "react-hot-toast";
import axios from "axios";
export const getProgramCategory = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program-category?nested=1`);
        if (res?.data?.success == true) {
            return res?.data?.data
        }
    } catch (err) {
        toast.error(err.response?.data?.message);
        return err?.response?.data?.errors
    }
}

export const getProgramsByCategory = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/programs`);
        if (res?.data?.success == true) {
            return res?.data?.data
        }
    } catch (err) {
        toast.error(err.response?.data?.message);
        return err?.response?.data?.errors
    }
}


export const getSingleProgram = async (programId) => {
    if (programId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/programs/${programId}`);
            if (res?.data?.success == true) {
                return res?.data?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data?.errors
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
            if (res?.data?.success == true) {
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data
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
            if (res?.data?.success == true) {
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data
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
            if (res?.data?.success == true) {
                return res?.data?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data?.errors
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
            if (res?.data?.success == true) {
                toast.success(res?.data?.message)
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data
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
            if (res?.data?.success == true) {
                toast.success(res?.data?.message)
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data
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
            if (res?.data?.success == true) {
                toast.success(res?.data?.message)
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data
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
            if (res?.data?.success == true) {
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data?.errors
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
            if (res?.data?.success == true) {
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data?.errors
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
            if (res?.data?.success == true) {
                toast.success(res?.data?.message)
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data
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
            if (res?.data?.success == true) {
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data
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
            if (res?.data?.success == true) {
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data
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
            if (res?.data?.success == true) {
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data
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
            if (res?.data?.success == true) {
                toast.success(res?.data?.message)
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data
        }
    }
}



export const getWhoamIQuestions = async (enrollmentId, structureId) => {
    const token = localStorage.getItem('token')
    if (token && enrollmentId && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/who-am-i/questions`, {
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
    }
}



export const saveWhoamIQuestion = async (enrollmentId, structureId, questionId, data) => {
    const token = localStorage.getItem('token')

    if (token && data && enrollmentId && structureId && questionId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/who-am-i/questions/${questionId}/answer`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
            if (res?.data?.success == true) {
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data
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
            if (res?.data?.success == true) {
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data
        }
    }
}



export const getlifeElements = async (enrollmentId, structureId) => {
    const token = localStorage.getItem('token')
    if (token && enrollmentId && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/wheel-of-life/elements`, {
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
    }
}


export const saveLifeElements = async (enrollmentId, structureId, data) => {
    const token = localStorage.getItem('token')
    if (token && data && enrollmentId && structureId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/wheel-of-life/ratings`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
    }
}


export const getQuestionsoflifeElements = async (enrollmentId, structureId, elementId) => {
    const token = localStorage.getItem('token')
    if (token && enrollmentId && structureId && elementId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/wheel-of-life/elements/${elementId}/questions`, {
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
    }
}


export const saveWheelOfLifequestion = async (enrollmentId, structureId, questionId, data, elementId) => {
    const token = localStorage.getItem('token')

    if (token && data && enrollmentId && structureId && questionId && elementId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/wheel-of-life/elements/${elementId}/questions/${questionId}/answer`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
    }
}


export const getCardGameState = async (enrollmentId, structureId) => {
    const token = localStorage.getItem('token')
    if (token && enrollmentId && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/card-game/state`, {
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
    }
}


export const saveCardGameQuestions = async (enrollmentId, structureId, questionId, data, setId) => {
    const token = localStorage.getItem('token')

    if (token && data && enrollmentId && structureId && questionId && setId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/card-game/question-sets/${setId}/questions/${questionId}/answer`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (res?.data?.success == true) {
                toast.success(res?.data?.message)
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err?.response?.data
        }
    }
}



export const saveCardSelection = async (enrollmentId, structureId, data, setId) => {
    const token = localStorage.getItem('token')
    console.log(setId)

    if (token && data && enrollmentId && structureId && setId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/card-game/question-sets/${setId}/card-selection`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
    }
}


export const finalSubmitCard = async (enrollmentId, structureId) => {
    const token = localStorage.getItem('token')
    if (token && enrollmentId && structureId) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/card-game/submit`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
    }
}

export const getprogramResources = async (enrollmentId, structureId) => {
    const token = localStorage.getItem('token')
    if (token && enrollmentId && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/upload-documents/resources`, {
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
    }
}

export const getGoalSettings = async (enrollmentId, structureId) => {
    const token = localStorage.getItem('token')
    if (token && enrollmentId && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/goal-settings/goals`, {
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
    }
}

export const postGoalSettings = async (enrollmentId, structureId, data) => {
    const token = localStorage.getItem('token')
    if (token && data && enrollmentId && structureId) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/goal-settings/goals`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
    }
}


export const updateGoalSettings = async (enrollmentId, structureId, goalId, data) => {
    const token = localStorage.getItem('token')
    if (token && data && enrollmentId && structureId && goalId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/goal-settings/goals/${goalId}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
    }
}


export const deleteGoal = async (enrollmentId, structureId, goalId) => {
    const token = localStorage.getItem('token')
    if (token && enrollmentId && structureId && goalId) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/goal-settings/goals/${goalId}`, {
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
    } else {
        toast.error('Enrollment Id is required')
    }
}

export const getHabitTrackerState = async (enrollmentId, structureId) => {
    const token = localStorage.getItem('token')
    if (token && enrollmentId && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/habit-tracker/state`, {
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
    }
}


export const postHabit = async (enrollmentId, structureId, data) => {
    const token = localStorage.getItem('token')
    if (token && data && enrollmentId && structureId) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/habit-tracker/habits`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
    }
}


export const updateHabit = async (enrollmentId, structureId, habitId, data) => {
    const token = localStorage.getItem('token')
    if (token && data && enrollmentId && structureId && habitId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/habit-tracker/habits/${habitId}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
    }
}


export const deleteHabit = async (enrollmentId, structureId, habitId) => {
    const token = localStorage.getItem('token')
    if (token && enrollmentId && structureId && habitId) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/customer/enrollments/${enrollmentId}/modules/${structureId}/habit-tracker/habits/${habitId}`, {
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
    } else {
        toast.error('Enrollment Id is required')
    }
}