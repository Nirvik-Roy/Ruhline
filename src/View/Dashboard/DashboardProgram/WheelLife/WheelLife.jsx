import React, { useEffect, useState } from 'react'
import LifeElements from './LifeElements'
import ElementsQuestion from './ElementsQuestion'
import { getQuestionsoflifeElements, saveLifeElements } from '../../../../utils/program'
import { useParams } from 'react-router-dom'
import Loaders from '../../../../Components/Loaders/Loaders'
import PrevSubmit from '../../../../Components/PrevSubmit/PrevSubmit'
import toast from 'react-hot-toast'
import DashboardLoader from '../../../../Components/Loaders/DashboardLoader'

const WheelLife = ({ completedFunction, lifeElements }) => {
    const [loading, setloading] = useState(false);
    const [postLoading, setpostLoading] = useState(false)
    const [ratingData, setratingData] = useState([]);
    const [questionsData, setquestionsdata] = useState([]);
    const { enrollmentId } = useParams()
    const [toggle, setToggle] = useState({
        life: true,
        questions: false,
    })

    const handleRating = (index, ratingRate) => {
        const dummyData = [...ratingData]
        dummyData[index].rating = ratingRate
        setratingData([...dummyData])
    }
    const toggleFunction = (id) => {
        setToggle({
            life: id === 1 ? true : false,
            questions: id === 2 ? true : false
        })
    }

    const fetchLifeElementsQuestion = async (elementId) => {
        setloading(true)
        const res = await getQuestionsoflifeElements(enrollmentId, lifeElements?.program_structure_id, elementId)
        if (res?.success) {
            setquestionsdata(res?.data || [])
        }
        setloading(false)
    }

    const postLifeElements = async () => {
        setpostLoading(true)
        const hasZeroRating = ratingData.some(item => item.rating === 0);
        if (hasZeroRating) {
            setpostLoading(false)
            toast.error('Please rate all the elements')
            return;
        } else {
            const payload = {
                ratings: ratingData.map((item) => ({
                    element_id: item.id,
                    rating: item.rating
                }))
            };
            const formData = new FormData()
            ratingData.forEach((element, index) => {
                formData.append(`ratings[${index}][element_id]`, element.id)
                formData.append(`ratings[${index}][rating]`, element.rating)
            })
            const res = await saveLifeElements(enrollmentId, lifeElements?.program_structure_id, formData)
            if (res?.success) {
                fetchLifeElementsQuestion(ratingData?.[0]?.id)
                toggleFunction(2)
            }
            setpostLoading(false)
        }
        setpostLoading(false)
    }

    useEffect(() => {
        if (!lifeElements?.elements) return;
        const mappedSections = lifeElements.elements.map((e) => ({
            id: e?.id ?? null,
            rating: e?.rating?.value ?? 0
        }));
        setratingData(mappedSections);
    }, [lifeElements]);
    return (
        <>

            {toggle.life && <LifeElements postLoading={postLoading} postLifeElements={postLifeElements} ratingData={ratingData} handleRating={handleRating} lifeElements={lifeElements} toggleFunction={toggleFunction} />}

            {toggle.questions && <ElementsQuestion fetchLifeElementsQuestion={fetchLifeElementsQuestion} questionsData={questionsData} completedFunction={completedFunction} />}

            {loading && <div style={{
                height: '30vh',
                position: 'relative'
            }}>
                <DashboardLoader />
            </div>}
        </>
    )
}

export default WheelLife
