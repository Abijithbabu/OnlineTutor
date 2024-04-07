import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import { CoPresentRounded, Logout, School } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { signOut } from '../../utils/api';
import { useDispatch } from 'react-redux';

const categories = [
   {
      id: 'Manage',
      children: [
         { id: 'Dashboard', icon: <DnsRoundedIcon />, path: '/admin' },
         { id: 'Students', icon: <PeopleIcon />, path: '/manage-students' },
         { id: 'Teachers / Institutions', icon: <CoPresentRounded />, path: '/manage-org' },
         { id: 'Courses', icon: <School />, path: '/manage-courses' },
      ],
   },
   {
      id: 'Settings',
      children: [
         { id: 'Signout', icon: <Logout />, path: '/logout' },
      ],
   },
];

const item = {
   py: '2px',
   px: 3,
   color: 'rgba(255, 255, 255, 0.7)',
   '&:hover, &:focus': {
      bgcolor: 'rgba(255, 255, 255, 0.08)',
   },
};

const itemCategory = {
   boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
   py: 1.5,
   px: 3,
};

export default function Navigator(props) {
   const { ...other } = props;
   const pathname = useLocation().pathname;
   const navigate = useNavigate()
   const dispatch = useDispatch()
   return (
      <Drawer variant="permanent" {...other}>
         <List disablePadding>
            <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
               TUTFINDER
            </ListItem>
            <ListItem sx={{ ...item, ...itemCategory }}>
               <ListItemText>Admin management console</ListItemText>
            </ListItem>
            {categories.map(({ id, children }) => (
               <Box key={id} sx={{ bgcolor: '#101F33' }}>
                  <ListItem sx={{ py: 2, px: 3 }}>
                     <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                  </ListItem>
                  {children.map(({ id: childId, icon, path }) => (
                     <ListItem disablePadding key={childId}>
                        <ListItemButton selected={pathname === path} sx={item} onClick={() => path === '/logout' ? signOut(dispatch) : navigate(path)}>
                           <ListItemIcon>{icon}</ListItemIcon>
                           <ListItemText>{childId}</ListItemText>
                        </ListItemButton>
                     </ListItem>
                  ))}
                  <Divider sx={{ mt: 2 }} />
               </Box>
            ))}
         </List>
      </Drawer>
   );
}