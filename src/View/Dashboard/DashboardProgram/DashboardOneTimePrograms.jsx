import img from '../../../assets/Images/image.png'
import { useNavigate } from 'react-router-dom'
const DashboardOneTimePrograms = ({ oneTimePrograms }) => {
    const navigate = useNavigate()
    return (
        <>
            <div className='all_programs_wrapper'>
                {oneTimePrograms?.length <= 0 && <p style={{
                    fontWeight: '600',
                    textAlign: 'center',
                    color: 'var(--primary-color)',
                    gridColumn: '1/-1'
                }}>No programs available</p>}
                {oneTimePrograms?.map((e, i) => (
                    <div key={i} onClick={(() => { navigate(`/dashboard/programs/schedule/${e?.program?.id}/${e?.id}`) })} className='all_program_card'>
                        <p style={(e.enrollment_status === 'pending' || e.enrollment_status === 'upcoming') ? {
                            background: 'rgba(255, 77, 73, 1)',
                            textTransform: 'capitalize'
                        } : {
                            background: 'rgba(36, 159, 50, 1)',
                            textTransform: 'capitalize'
                        }}>{e.enrollment_status}</p>
                        <img src={e?.program?.main_image || img} />
                        <h6>{e?.program?.name}</h6>
                        <small style={{
                            textTransform: 'capitalize'
                        }}>{e?.program?.occurrence_type}</small>
                    </div>
                ))}

            </div>
        </>
    )
}

export default DashboardOneTimePrograms
