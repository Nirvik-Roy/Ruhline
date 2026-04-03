import React from 'react'
import './ProgramSidebar.css'
import search from '../../assets/Images/Search.svg'
import Button from '../../Components/Button/Button'
const ProgramSidebar = ({ Category, Enrollment, Coaches, Gender, setSearchTerm }) => {
    return (
        <>
            <div className='program_sidebar_wrapper'>
                <div className='search_sidebar_wrapper'>
                    <input onChange={((e) => setSearchTerm(e.target.value))} type='text' placeholder='Search' />
                    <img src={search} />
                </div>

                {Category && <div className='dropown_wrapper'>
                    <div className='dropdown_head'>
                        <h3>Category</h3>
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                    <ul className='dropdown_list'>
                        {[1, 2, 3, 4, 5].map((e) => {
                            return (
                                <>
                                    <li key={e}>Category {e} </li>
                                </>
                            )

                        })}
                    </ul>
                </div>}

                {/* {Enrollment && <div className='dropown_wrapper'>
                    <div className='dropdown_head'>
                        <h3>Enrollment Type</h3>
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                    <ul className='dropdown_list'>
                        <div className='dropdown_radio_wrapper'>
                            <input type='radio' />
                            <p>Paid</p>
                        </div>
                        <div className='dropdown_radio_wrapper'>
                            <input type='radio' />
                            <p>Free</p>
                        </div>
                    </ul>
                </div>} */}


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
                    <Button children={'Apply'} styles={{ width: '48%' }} />
                    <Button children={'Reset'} styles={{ border: '1px solid var(--primary-color)', background: 'transparent', color: 'var(--primary-color)', width: '48%' }} />
                </div>
            </div>
        </>
    )
}

export default ProgramSidebar
