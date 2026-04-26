import React, { useEffect, useState } from 'react'
import BannerLayout from '../../BannerLayout/BannerLayout'
import Pagination from '../../../Components/Pagination/Pagination'
import ProgramSidebar from '../ProgramSidebar'
import { getAllCoaches } from '../../../utils/coach'
import Loaders from '../../../Components/Loaders/Loaders'
import DashboardLoader from '../../../Components/Loaders/DashboardLoader'

const Coaches = () => {
    const [coachData, setCoachData] = useState([]);
    const [filteredData, setFilteredData] = useState([]); // ✅ moved to state
    const [coachType, setCoachType] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    const getCoachesFunc = async () => {
        try {
            setLoading(true);
            const res = await getAllCoaches();
            setCoachData(res?.data);
            setFilteredData(res?.data); // ✅ initialize filteredData too
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCoachesFunc();
    }, []);

    // Debounced search — updates filteredData via state
    useEffect(() => {
        const timer = setTimeout(() => {
            const searched = coachData?.filter((item) =>
                item?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(searched);
            setGender('')
            setCoachType('')
            setCurrentPage(0); // reset to first page on new search
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm, coachData]); // ✅ depend on coachData so search works after load

    // ✅ applyFunction now updates React state instead of local variables
    const applyFunction = () => {
        let result = [...(coachData || [])];

        if (gender) {
            result = result.filter(
                (item) => item?.profile?.gender?.toLowerCase() === gender.toLowerCase()
            );
        }

        if (coachType) {
            result = result.filter(
                (item) => item?.profile?.coach_type?.toLowerCase() === coachType.toLowerCase()
            );
        }

        setFilteredData(result);
        setCurrentPage(0); // reset to first page after applying filter
    };

    // Pagination
    const itemsPerPage = 9;
    const offset = currentPage * itemsPerPage;
    const currentItems = filteredData?.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredData?.length / itemsPerPage);

    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected);
    };

    return (
        <>
            {/* {loading && <Loaders />} */}
            <BannerLayout title={'Coaches'} />
            <div className='program_wrapper'>
                <div className='all_Container program_content_wrapper'>
                    <ProgramSidebar
                        applyFunction={applyFunction}
                        getCoachesFunc={getCoachesFunc}
                        setGender={setGender}
                        gender={gender}
                        setcoachType={setCoachType}
                        coachType={coachType}
                        setSearchTerm={setSearchTerm}
                        Coaches={true}
                        Gender={true}
                    />
                    <div className='program_content_right'>
                        {loading && <div style={{
                            position: 'relative',
                            minHeight:'50vh'
                        }}>
                            <DashboardLoader />
                        </div>
                        }
                        {!loading && <div className='program_content_grid_Wrapper'>
                            {currentItems?.length <= 0 && <p>No Coaches are available...</p>}
                            {currentItems?.map((e) => (
                                <div className='program_card156' key={e.id}>
                                    <img src={e?.profile?.profile_image} alt={e?.user?.name} />
                                    <div className='overlay' style={{ zIndex: 9 }}></div>
                                    <div className='home_coach_slide_content' style={{
                                        zIndex: 9,
                                        background: 'rgba(0,0,0,0.4)',
                                        backdropFilter: 'blur(5px)',
                                        width: '100%',
                                        bottom: '0',
                                        minHeight: '50px',
                                        padding: '10px',
                                        left: '0'
                                    }}>
                                        <h5 style={{ zIndex: 9, fontWeight: '800' }}>{e?.user?.name}</h5>
                                        <h6 style={{ zIndex: 9 }}>{e.occupation}</h6>
                                    </div>
                                </div>
                            ))}
                        </div>}
                        <div>
                            <Pagination
                                pageCount={pageCount}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Coaches;