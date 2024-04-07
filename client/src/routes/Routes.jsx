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
import Profile from '../pages/tutor/Profile'
import AdminDashboard from '../pages/admin/Dashboard'
import Teacher from '../pages/admin/Teacher'
import Students from '../pages/admin/Students'
import ManageCourse from '../pages/admin/ManageCourse'

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
        <Route path="/profile" element={<Profile />} />
        <Route path="/liveClasses" element={<LiveClasses />} />
      </Route>
      <Route element={<UserPrivateRoute user={'Admin'} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manage-org" element={<Teacher />} />
        <Route path="/manage-students" element={<Students />} />
        <Route path="/manage-courses" element={<ManageCourse />} />
      </Route>
    </Routes>
  )
}

export default Router