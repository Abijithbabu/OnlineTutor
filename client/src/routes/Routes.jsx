import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Live from '../pages/Live'
import AuthRoutes from './AuthProtected'
import UserPrivateRoute from './UserProtected'
import Dashboard from '../pages/tutor/Dashboard'
import Home from '../pages/Home'
import Courses from '../pages/tutor/Courses'
import LiveClasses from '../pages/tutor/LiveClasses'
import PublicProtected from './PublicProtected'
import CourseDetails from '../pages/student/CourseDetails'


const Router = () => {
  return (
    <Routes>
      <Route element={<PublicProtected />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<AuthRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<UserPrivateRoute />}>
        <Route path="/live" element={<Live />} />
      </Route>
      <Route element={<UserPrivateRoute user={'Student'} />}>
        <Route path="/courses" element={<Home />} />
        <Route path="/courseDetails/:id" element={<CourseDetails />} />
      </Route>
      <Route element={<UserPrivateRoute user={'Tutor'} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/myCourses" element={<Courses />} />
        <Route path="/liveClasses" element={<LiveClasses />} />
      </Route>
    </Routes>
  )
}

export default Router