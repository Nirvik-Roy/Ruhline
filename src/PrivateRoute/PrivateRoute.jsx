import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import { verifyToken } from '../../Store/Slices/Loginslice/AuthSlice';
import Loaders from '../Components/Loaders/Loaders';

const PrivateRoute = () => {
    const { isLogin, isChecking } = useSelector(state => state.auth);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(verifyToken())
    }, [isLogin])
    if (isChecking) {
        return <Loaders />;
    }
    return isLogin ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoute
