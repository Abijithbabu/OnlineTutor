import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const UserPrivateRoute = ({ user }) => {
   const data = useSelector((state) => state?.data)
   if (user) {
      return data?.user?.type === user ? <Outlet /> : <Navigate to={data?.user?.type === 'Tutor' ? '/dashboard' : '/'} replace />;
   }
   return data?.isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />;
}

export default UserPrivateRoute