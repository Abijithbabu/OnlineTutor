import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/general/Login'
import Register from '../pages/general/Register'
import Live from '../pages/general/Live'
import AuthRoutes from './AuthProtected'
import UserPrivateRoute from './UserProtected'
import Dashboard from '../pages/tutor/Dashboard'
import Home from '../pages/general/Home'
import Courses from '../pages/tutor/Courses'
import LiveClasses from '../pages/tutor/LiveClasses'
import PublicProtected from './PublicProtected'
import CourseDetails from '../pages/student/CourseDetails'
import LiveMeeting from '../components/general/live/LiveMeeting'
import CourseList from '../pages/student/CourseList'

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
        <Route path="/live/:roomID" element={<Live />} />
        <Route path="/joinlive" element={<LiveMeeting />} />
      </Route>
      <Route element={<UserPrivateRoute user={'Student'} />}>
        <Route path="/courses" element={<CourseList />} />
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