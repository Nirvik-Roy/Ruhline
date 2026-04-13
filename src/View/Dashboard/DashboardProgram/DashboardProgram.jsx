import React, { useEffect, useState } from 'react'
import './DashboardProgram.css'
import AllPrograms from './AllPrograms'
import RecurringPrograms from './RecurringPrograms'
import DashboardOneTimePrograms from './DashboardOneTimePrograms'
import Loaders from '../../../Components/Loaders/Loaders'
import { getProgramEnrollments } from '../../../utils/program'
const DashboardProgram = () => {
    const [allEnrolledPrograms, setellEnrolledPrograms] = useState([]);
    const [requirringPrograms, setrequirringPrograms] = useState([]);
    const [oneTimePrograms,setoneTimePrograms] = useState([])
    const [loading, setloading] = useState(false)
    const [toggle, setToggle] = useState({
        toggle1: true,
        toggle2: false,
        toggle3: false
    })
    const toggleFunction = (i) => {
        setToggle({
            toggle1: i === 1 && true,
            toggle2: i === 2 && true,
            toggle3: i === 3 && true,
        })
    }

    const fetchEnrolledPrograms = async () => {
        setloading(true)
        const res = await getProgramEnrollments()
        if (res?.success) {
            setellEnrolledPrograms(res?.data?.data)
        }
        setloading(false)
    }

    useEffect(() => {
        if (allEnrolledPrograms?.length > 0) {
            setrequirringPrograms(allEnrolledPrograms?.filter((e) => e?.program?.occurrence_type =='recurring'))
            setoneTimePrograms(allEnrolledPrograms?.filter((e) => e?.program?.occurrence_type == 'one_time'))
        }else{
            setrequirringPrograms([])
        }
    }, [allEnrolledPrograms])

    useEffect(() => {
        fetchEnrolledPrograms()
    }, [])
    return (
        <>
            {loading && <Loaders />}
            <div className='dashboard_content_wrapper'>
                <h3>Programs</h3>
                <hr style={{
                    color: 'rgba(217, 217, 217, 1)',
                    marginTop: '30px'
                }} />

                <div className='dasboard_programs_tabs_wrapper'>
                    <p className={toggle.toggle1 && 'active'} onClick={(() => toggleFunction(1))}>All Programs</p>
                    <p className={toggle.toggle2 && 'active'} onClick={(() => toggleFunction(2))}>Recurring</p>
                    <p className={toggle.toggle3 && 'active'} onClick={(() => toggleFunction(3))}>One-time</p>
                </div>

                {toggle.toggle1 && <AllPrograms allEnrolledPrograms={allEnrolledPrograms} />}
                {toggle.toggle2 && <RecurringPrograms requirringPrograms={requirringPrograms} />}
                {toggle.toggle3 && <DashboardOneTimePrograms oneTimePrograms={oneTimePrograms} />}
            </div>
        </>
    )
}

export default DashboardProgram
