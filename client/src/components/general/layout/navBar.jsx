
import React from 'react';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, Toolbar, Tooltip, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import AdbIcon from '@mui/icons-material/Adb';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeButton from './themeButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../../utils/api';
import Logo from './logo.png'
import { Logout } from '@mui/icons-material';

const Navbar = ({ onToggleColorMode, onTheme }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const data = useSelector(store => store?.data)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const pages = [
        { name: 'Home', path: '/' },
        { name: 'Courses', path: '/courses' },
    ];
    const settings = [
        { name: 'Logout', onClick: () => signOut(dispatch), icon: <Logout /> },
    ];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (

        <AppBar component={motion.div} initial={{ scale: -1 }} transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
        }} animate={{ scale: 1 }}
            position="static" sx={{ borderRadius: 3, marginTop: 2 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <IconButton sx={{ backgroundColor: 'white', mr: 1, display: { xs: 'none', md: 'flex' } }}>

                        <img src={Logo} height={40} borderRadius={50} />
                    </IconButton>
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
                        TUTFINDER
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((x) => (
                                <MenuItem key={x.name} onClick={() => navigate(x.path)}>
                                    <Typography textAlign="center">{x.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        TUTFINDER
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => navigate(page.path)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {data?.isAuthenticated ?
                            <Box sx={{ flexGrow: 0 }} marginLeft={'auto'} display={'flex'} flexDirection={'row'} alignItems={'center'}>

                                <Typography sx={{ display: { xs: 'none', md: 'flex' } }} fontWeight={600}>{data?.user?.name?.charAt(0).toUpperCase() + data?.user?.name?.slice(1)}</Typography>
                                &nbsp;&nbsp;
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={data?.user?.name?.toUpperCase()} src="/static/images/avatar/2.jpg" />
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
                                            <Button style={{ color: onTheme?.palette.mode === 'dark' ? 'white' : '#a31545' }}>
                                                {x.icon}&nbsp;&nbsp;{x.name}
                                            </Button>
                                        </MenuItem>
                                    ))}
                                    <MenuItem>
                                        <ThemeButton toggleColorMode={onToggleColorMode} theme={onTheme} />
                                    </MenuItem>
                                </Menu>
                            </Box>
                            : <Button variant='contained' onClick={() => navigate('/login')}>Login</Button>}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
