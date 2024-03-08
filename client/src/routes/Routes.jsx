import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login'
import Register from '../pages/register'
import Home from '../pages/home'
import Layout from '../layout/layout'
import Live from '../pages/Live'


const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/courses" element={<Home />} />
        <Route path="/live" element={<Live />} />
      </Route>
      {/* <Route element={<AuthLayout />}> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* </Route> */}

    </Routes>
  )
}

export default Router