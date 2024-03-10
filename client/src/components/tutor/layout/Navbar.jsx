import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../../utils/api';
import { Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, styled } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';

import Adb from '@mui/icons-material/Adb';
import ThemeButton from '../../themeButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { Apps, DoubleArrow } from '@mui/icons-material';

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Navbar = ({ onTheme, onToggleColorMode, open, setOpen }) => {
    const user = useSelector(store => store?.data?.user)
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const pathname = useLocation().pathname;

    const settings = [
        { name: 'Profile', onClick: () => navigate('/profile') },
        { name: 'Logout', onClick: () => signOut(dispatch) },
    ];

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                    }}
                >
                    <Apps />
                </IconButton>
                <Adb sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    TUTOR
                </Typography>
                <DoubleArrow />&nbsp;&nbsp;
                <Typography fontWeight={700}>{pathname?.charAt(1).toUpperCase() + pathname?.slice(2)}</Typography>


                <Box sx={{ flexGrow: 0 }} marginLeft={'auto'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <Typography fontWeight={600}>{user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}</Typography>
                    &nbsp;&nbsp;
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt={user?.name} src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((x) => (
                            <MenuItem key={x.name} onClick={() => x.onClick()}>
                                <Typography textAlign="center">{x.name}</Typography>
                            </MenuItem>
                        ))}
                        <MenuItem>
                            <ThemeButton toggleColorMode={onToggleColorMode} theme={onTheme} /> Theme
                        </MenuItem>
                    </Menu>

                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar