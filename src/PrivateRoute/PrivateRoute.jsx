import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import { verifyToken } from '../../Store/Slices/Loginslice/AuthSlice';
import Loaders from '../Components/Loaders/Loaders';
import { getAllCmsData } from '../utils/cms';

const PrivateRoute = () => {
    const { isLogin, isChecking } = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const [loading, setloading] = useState(false)
    useEffect(() => {
        dispatch(verifyToken())
    }, [isLogin])

    const [data, setData] = useState();
    const fetchData = async () => {
        try {
            setloading(true);
            const res = await getAllCmsData('/site-setting');
            setData(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    if (isChecking) {
        return <Loaders />;
    }
    return isLogin ? <Outlet context={{ setGlobalLoading: setloading, sitesettingsData: data }} /> : <Navigate to="/" replace />;
}

export default PrivateRoute
