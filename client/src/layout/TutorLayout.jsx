import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import Navbar from '../components/tutor/layout/Navbar';
import CustomDrawer from '../components/tutor/layout/CustomDrawer';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

export default function TutorLayout({ children }) {

    const colorMode = useSelector(state => state?.mode)
    const [open, setOpen] = React.useState(true);
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar
                onToggleColorMode={colorMode.toggleColorMode}
                onTheme={colorMode.theme}
                open={open}
                setOpen={setOpen}
            />
            <CustomDrawer
                open={open}
                setOpen={setOpen}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}
