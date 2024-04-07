import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Logo from '../general/layout/logo.png'
import { useLocation, useNavigate } from 'react-router-dom'
const lightColor = 'rgba(255, 255, 255, 0.7)';
const tabs = [
   { id: 'Dashboard', path: '/admin' },
   { id: 'Students', path: '/manage-students' },
   { id: 'Teachers / Institutions', path: '/manage-org' },
   { id: 'Courses', path: '/manage-courses' },
]

function Header(props) {
   const { onDrawerToggle } = props;
   const [time, setTime] = React.useState()
   const pathname = useLocation().pathname
   const navigate = useNavigate()
   setInterval(() => {
      const date = new Date()
      setTime(`${date.toLocaleTimeString()}`)
   }, 1000)
   const [value, setValue] = React.useState(tabs.findIndex(tab => tab.path === pathname));

   const handleChange = (event, newValue) => {
      setValue(newValue);
      navigate(tabs[newValue]?.path)
   };

   return (
      <React.Fragment>
         <AppBar color="primary" position="sticky" elevation={0}>
            <Toolbar>
               <Grid container spacing={1} alignItems="center">
                  <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                     <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={onDrawerToggle}
                        edge="start"
                     >
                        <MenuIcon />
                     </IconButton>
                  </Grid>
                  <Grid item xs />
                  <Grid item>
                     <Link
                        href="/"
                        variant="body2"
                        sx={{
                           textDecoration: 'none',
                           color: lightColor,
                           '&:hover': {
                              color: 'common.white',
                           },
                        }}
                        rel="noopener noreferrer"
                        target="_blank"
                     >
                        Admin Tutfinder
                     </Link>
                  </Grid>
                  <Grid item>
                     <IconButton color="inherit" sx={{ p: 0.5, backgroundColor: 'white' }}>
                        <Avatar src={Logo} alt="My Avatar" />
                     </IconButton>
                  </Grid>
               </Grid>
            </Toolbar>
         </AppBar>
         <AppBar
            component="div"
            color="primary"
            position="static"
            elevation={0}
            sx={{ zIndex: 0 }}
         >
            <Toolbar>
               <Grid container alignItems="center" spacing={1}>
                  <Grid item xs>
                     <Typography color="inherit" variant="h5" component="h1">
                        ADMIN CONSOLE
                     </Typography>
                  </Grid>
                  <Grid item fontSize={13}>
                     {time}
                     {` | ${new Date().toDateString()}`}
                  </Grid>
                  <Grid item>
                     <Tooltip title="Help">
                        <IconButton color="inherit">
                           <HelpIcon />
                        </IconButton>
                     </Tooltip>
                  </Grid>
               </Grid>
            </Toolbar>
         </AppBar>
         <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
            <Tabs value={value} textColor="inherit" onChange={handleChange}>
               {tabs.map(x => <Tab key={x.id} label={x.id} />)}
            </Tabs>
         </AppBar>
      </React.Fragment>
   );
}

Header.propTypes = {
   onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;