import React from 'react'
import { useSelector } from 'react-redux';
import { Container } from '@mui/material'
import Navbar from '../components/navBar'
import { Outlet } from 'react-router-dom';

const Layout = () => {
   const colorMode = useSelector(state => state?.mode)
   return (
      <>
         <>
            <Navbar onToggleColorMode={colorMode.toggleColorMode} onTheme={colorMode.theme} />
            <Outlet/>
         </>
      </>
   )
}

export default Layout