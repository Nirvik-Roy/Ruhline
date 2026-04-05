import React, { useEffect, useState } from 'react'
import './ProgramSidebar.css'
import search from '../../assets/Images/Search.svg'
import Button from '../../Components/Button/Button'
import { getProgramCategory } from '../../utils/program'
import Loaders from '../../Components/Loaders/Loaders'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
const ProgramSidebar = ({ Category, Enrollment, Coaches, Gender, setSearchTerm, getProgramByCategories }) => {
    const { id } = useParams()
    const [programCategories, setprogramCategories] = useState([])
    const [categoryId, setcategoryId] = useState()
    const [filterCategories, setfilterCategories] = useState([])
    const [loading, setloading] = useState(false)
    const getAllProgramsFunc = async () => {
        try {
            setloading(true)
            const res = await getProgramCategory()
            setprogramCategories(res)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        getAllProgramsFunc()
    }, [])

    useEffect(() => {
        if (programCategories.length > 0) {
            const filteredData = programCategories.filter((e) => e.id == id)
            setfilterCategories([...filteredData])
        }
    }, [programCategories])


    return (
        <>
            {loading && <Loaders />}
            <div className='program_sidebar_wrapper'>
                <div className='search_sidebar_wrapper'>
                    <input onChange={((e) => setSearchTerm(e.target.value))} type='text' placeholder='Search' />
                    <img src={search} />
                </div>

                {Category && <div className='dropown_wrapper'>
                    <div className='dropdown_head'>
                        <h3>Sub Category</h3>
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                    <ul className='dropdown_list'>
                        {filterCategories?.map((e) => {
                            return (
                                <>
                                    {e?.children?.map((element) => (
                                        <li style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px'
                                        }}> <input checked={categoryId == element.id} onChange={(() => {
                                            if (categoryId == element.id) {
                                                setcategoryId('')
                                            } else {
                                                setcategoryId(element?.id)
                                                
                                            }
                                        })} type='checkbox' style={{
                                            width: '20px',
                                            height: '20px',
                                            accentColor: 'var(--primary-color)'
                                        }} /> {element?.name}</li>
                                    ))}
                                </>
                            )
                        })}
                    </ul>
                </div>}

                {Coaches &&
                    <div className='dropown_wrapper'>
                        <div className='dropdown_head'>
                            <h3>Coaches Type</h3>
                            <i class="fa-solid fa-angle-down"></i>
                        </div>
                        <ul className='dropdown_list'>
                            <div className='dropdown_radio_wrapper'>
                                <input type='radio' />
                                <p>Mentor</p>
                            </div>
                            <div className='dropdown_radio_wrapper'>
                                <input type='radio' />
                                <p>Yoga Trainer</p>
                            </div>
                        </ul>
                    </div>}


                {Gender && <div className='dropown_wrapper'>
                    <div className='dropdown_head'>
                        <h3>Gender</h3>
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                    <ul className='dropdown_list'>
                        <div className='dropdown_radio_wrapper'>
                            <input type='radio' />
                            <p>Male</p>
                        </div>
                        <div className='dropdown_radio_wrapper'>
                            <input type='radio' />
                            <p>Female</p>
                        </div>
                    </ul>
                </div>}

                <div className='dropdown_btn_wrapper'>
                    <Button onClick={(()=>{
                        if(categoryId){
                            getProgramByCategories(categoryId)
                        }else{
                            toast.error('Plz select a category')
                        }
                    })} children={'Apply'} styles={{ width: '48%' }} />
                    <Button onClick={(()=>{
                        getProgramByCategories(id)
                        setcategoryId('')
                    })} children={'Reset'} styles={{ border: '1px solid var(--primary-color)', background: 'transparent', color: 'var(--primary-color)', width: '48%' }} />
                </div>
            </div>
        </>
    )
}

export default ProgramSidebar
