import React, { useState, useEffect } from 'react'
import './FAQ.css'
import FAQAccordion from './FAQAccordion'
import { getAllCmsData } from '../../../utils/cms'
import Loaders from '../../../Components/Loaders/Loaders'
import DashboardLoader from '../../../Components/Loaders/DashboardLoader'
const FAQ = () => {
    const [toggle, setToggle] = useState({
        toggle1: true,
        toggle2: false,
    })

    const toggleFunction = (i) => {
        setToggle({
            toggle1: i === 1 ? true : false,
            toggle2: i === 2 ? true : false
        })
    }

    const [loading, setloading] = useState(false);
    const [faqMentee, setfaqMentee] = useState();
    const [faqMentor, setfaqMentor] = useState()
    const fetchFaqMentee = async () => {
        try {
            setloading(true);
            const res = await getAllCmsData('/faq/mentee');
            console.log(res)
            setfaqMentee(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        fetchFaqMentee()
    }, [])


    const fetchFaqMentor = async () => {
        try {
            setloading(true);
            const res = await getAllCmsData('/faq/mentor');
            console.log(res)
            setfaqMentor(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        fetchFaqMentor()
    }, [])


    return (
        <>
            {loading && <div style={{
                minHeight: '70vh',
                position: 'relative'
            }}>

                {<DashboardLoader />}
            </div>}
            {(faqMentee?.length > 0 || faqMentor?.length > 0) && <div className='faq_wrapper'>
                <div className='all_Container faq_content_wrapper'>
                    <h2 className='all_heading'>FAQS</h2>
                    <h1 className='all_heading2'>Guidance That Feels Personal</h1>

                    <div className='mentor_wrapper'>
                        <p onClick={(() => toggleFunction(1))} style={toggle.toggle1 ? {
                            borderBottom: '2px solid var(--text-color)'
                        } : {}}>Mentee</p>
                        <p style={toggle.toggle2 ? {
                            borderBottom: '2px solid var(--text-color)'
                        } : {}} onClick={(() => toggleFunction(2))}>Mentor</p>
                    </div>
                    {toggle.toggle1 && <FAQAccordion faqMentee={faqMentee} />}
                    {toggle.toggle2 && <FAQAccordion faqMentor={faqMentor} />}
                </div>

            </div>}
        </>
    )
}

export default FAQ
