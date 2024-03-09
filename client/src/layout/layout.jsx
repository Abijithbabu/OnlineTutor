import React from 'react'
import { useSelector } from 'react-redux';
import Navbar from '../components/navBar'

const Layout = ({ children }) => {
   const colorMode = useSelector(state => state?.mode)
   return (
      <>
         <Navbar onToggleColorMode={colorMode.toggleColorMode} onTheme={colorMode.theme} />
         {children}
      </>
   )
}

export default Layout