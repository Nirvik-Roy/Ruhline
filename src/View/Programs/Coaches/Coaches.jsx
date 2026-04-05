import React, { useEffect, useState } from 'react'
import BannerLayout from '../../BannerLayout/BannerLayout'
import Pagination from '../../../Components/Pagination/Pagination'
import ProgramSidebar from '../ProgramSidebar'
import { getAllCoaches } from '../../../utils/coach'
import Loaders from '../../../Components/Loaders/Loaders'
const Coaches = () => {
    const [coachData, setcoachData] = useState([]);
    const [coachType, setcoachType] = useState('')
    const [gender, setGender] = useState('');
    const [loading, setloading] = useState(false)
    const getCoachesFunc = async () => {
        try {
            setloading(true)
            const res = await getAllCoaches()
            setcoachData(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        getCoachesFunc()
    }, [])


    // Pagination logic & Search Logic...
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500); // 500ms delay
        return () => clearTimeout(timer); // cleanup
    }, [searchTerm]);
    let filteredData = coachData?.filter((item) =>
        item?.user?.name?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(0);
    let offset = currentPage * itemsPerPage;
    let currentItems = filteredData?.slice(offset, offset + itemsPerPage);
    let pageCount = Math.ceil(filteredData?.length / itemsPerPage);
    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected);
    };

    const applyFunction = () => {
        const filteredData = coachData?.filter((item) =>
            item?.profile?.gender == gender
        );
        const itemsPerPage = 9;
        offset = currentPage * itemsPerPage;
        currentItems = filteredData?.slice(offset, offset + itemsPerPage);
        pageCount = Math.ceil(filteredData?.length / itemsPerPage);
    }
    return (
        <>
            {loading && <Loaders />}
            <BannerLayout title={'Coaches'} />
            <div className='program_wrapper'>
                <div className='all_Container program_content_wrapper'>
                    <ProgramSidebar applyFunction={applyFunction} getCoachesFunc={getCoachesFunc} setGender={setGender} gender={gender} setcoachType={setcoachType} coachType={coachType} setSearchTerm={setSearchTerm} Coaches={true} Gender={true} />
                    <div className='program_content_right'>
                        <div className='program_content_grid_Wrapper'>
                            {currentItems?.length <= 0 && <p>No Coaches are available...</p>}
                            {currentItems?.map((e) => (

                                <div className='program_card156' key={e.id}>
                                    <img src={e?.profile?.profile_image} />
                                    {/* <h3>{e.title}</h3> */}
                                    <div className='overlay' style={{
                                        zIndex: 9
                                    }}></div>
                                    <div className='home_coach_slide_content' style={{
                                        zIndex: 9,
                                        background: 'rgba(0,0,0,0.4)',
                                        backdropFilter: 'blur(5px)',
                                        width: '100%',
                                        bottom: '0',
                                        minHeight: '50px',
                                        padding: '10px ',
                                        left: '0'
                                    }}>
                                        <h5 style={{
                                            zIndex: 9,
                                            fontWeight: '800'
                                        }}>{e?.user?.name}</h5>
                                        <h6 style={{
                                            zIndex: 9
                                        }}>{e.occupation}</h6>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div >
                            <Pagination pageCount={pageCount}
                                currentPage={currentPage}
                                onPageChange={handlePageChange} />

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Coaches
