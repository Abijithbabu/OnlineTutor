import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Live from '../pages/Live'
import AuthRoutes from './AuthProtected'
import UserPrivateRoute from './UserProtected'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'


const Router = () => {
  return (
    <Routes>
      <Route element={<AuthRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<UserPrivateRoute />}>
        <Route path="/live" element={<Live />} />
      </Route>
      <Route element={<UserPrivateRoute user={'Student'} />}>
        <Route path="/courses" element={<Home />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route element={<UserPrivateRoute user={'Tutor'} />}>
      </Route>
    </Routes>
  )
}

export default Router