import React, { useEffect, useState } from 'react'
import '../Programs.css'
import BannerLayout from '../../BannerLayout/BannerLayout'
import Pagination from '../../../Components/Pagination/Pagination'
import ProgramSidebar from '../ProgramSidebar'
import img from '../../../assets/Images/Rectangle 448.png'
import { useNavigate, useParams } from 'react-router-dom'
import { getProgramsByCategory } from '../../../utils/program'
import Loaders from '../../../Components/Loaders/Loaders'
const SingleProgramCategory = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [loading, setloading] = useState(false)
    const [singleCategoriesProgram, setsingleCategoriesProgram] = useState([])

    const getProgramByCategories = async (id) => {
        setloading(true)
        const res = await getProgramsByCategory(id)
        setloading(false)
        setsingleCategoriesProgram(res?.data)
    }
    useEffect(() => {
        if (id) {
            getProgramByCategories(id)
        }
    }, [id])


    // Pagination logic & Search Logic...
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500); // 500ms delay
        return () => clearTimeout(timer); // cleanup
    }, [searchTerm]);
    const filteredData = singleCategoriesProgram?.filter((item) =>
        item?.name?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * itemsPerPage;
    const currentItems = filteredData?.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredData?.length / itemsPerPage);
    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected);
    };

    return (
        <>
            {loading && <Loaders />}
            <BannerLayout title={singleCategoriesProgram[0]?.program_category?.name} />
            <div className='program_wrapper'>
                <div className='all_Container program_content_wrapper'>
                    <ProgramSidebar getProgramByCategories={getProgramByCategories} singleCategoriesProgram={singleCategoriesProgram} setSearchTerm={setSearchTerm} Category={true} Enrollment={true} />
                    <div className='program_content_right'>
                        <div className='program_content_grid_Wrapper'>
                            {currentItems?.length <= 0 && <p>No Programs Available...</p>}
                            {currentItems?.map((e) => (
                                <div onClick={(() => navigate(`/single-program/${e?.id}`))} className='program_card156' key={e.id}>
                                    <img src={e?.main_image || img} />
                                    <h3>{e?.name}</h3>
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

export default SingleProgramCategory
