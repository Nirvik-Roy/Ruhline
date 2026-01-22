import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import { verifyToken } from '../../Store/Slices/Loginslice/AuthSlice';
const PublicRoute = () => {
    const { isLogin } = useSelector(state => state.auth);
    const dispatch = useDispatch()
    useState(() => {
        dispatch(verifyToken())
    }, [isLogin])
    return (
        <>
            {!isLogin ? <Outlet /> : <Navigate to='/dashboard' replace={true} />}
        </>
    )
}

export default PublicRoute
