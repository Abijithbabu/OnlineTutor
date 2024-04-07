import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PublicProtected = () => {
    const data = useSelector((state) => state?.data)
    return data?.isAuthenticated ? data?.user?.type === 'Student' ? <Outlet /> : <Navigate to={data?.user?.type === 'Admin' ? '/admin' : '/dashboard'} replace /> : <Outlet />
}

export default PublicProtected