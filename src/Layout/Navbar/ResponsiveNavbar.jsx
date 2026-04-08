import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../Components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { AuthlogOut } from '../../../Store/Slices/Loginslice/AuthSlice'
import { getProgramCategory } from '../../utils/program'

const ResponsiveNavbar = ({ handleModal, setShowNavbar }) => {
    const [dropdown, setDropdown] = useState(false)
    const { isLogin } = useSelector(state => state.auth);
    const [programCategories, setprogramCategories] = useState()
    const getAllProgramsFunc = async () => {
        try {
            const res = await getProgramCategory()
            setprogramCategories(res)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAllProgramsFunc()
    }, [])
    const dispatch = useDispatch()
    return (
        <>
            <div className='responsive_navbar_wrapper'>
                <Link onClick={(() => { setShowNavbar(false) })} to={'/'}>Home</Link>
                <Link onClick={(() => { setShowNavbar(false) })} to={'/about'}>About Us</Link>
                <Link className='program_links456' onClick={(() => setDropdown(!dropdown))}>Programs <i class="fa-solid fa-angle-down"></i></Link>
                {dropdown && <div className='program_links_wrapper'>
                    {programCategories?.length <= 0 && <p style={{
                        fontSize: '12px',
                    }}>No program available</p>}
                    {programCategories?.map((e) => (
                        <Link to={`/program/category/${e?.id}`}>{e?.name}</Link>
                    ))}
                </div>}
                <Link onClick={(() => { setShowNavbar(false) })} to={'/articles'}>Articles</Link>
                <Link onClick={(() => { setShowNavbar(false) })} to={'/contact'}>Contact Us</Link>
                <div onClick={(() => {
                    handleModal(1)
                    setShowNavbar(false)
                })}>
                    {!isLogin && <Button children={'Login/SignUp'} />}
                    {isLogin && <Button onClick={(() => dispatch(AuthlogOut()))} children={'Log out'} />}
                </div>

            </div>
        </>
    )
}

export default ResponsiveNavbar
