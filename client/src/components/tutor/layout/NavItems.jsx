
import CoPresentRoundedIcon from '@mui/icons-material/CoPresentRounded';
import { SvgIcon } from '@mui/material';
import FeaturedPlayListSharpIcon from '@mui/icons-material/FeaturedPlayListSharp';
import { AccountCircle, Chat, Dashboard, Logout } from '@mui/icons-material';
export const NavItems = [
     {
    title: 'Dashboard',
    path: '/dashboard', 
    icon: (
      <SvgIcon fontSize="small">
        <Dashboard />
      </SvgIcon>
    )
  },
  {
    title: 'Applications',
    path: '/manageApplications',
    icon: (
      <SvgIcon fontSize="small">
        <CoPresentRoundedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Applicants',
    path: '/manageApplicants',
    icon: (
      <SvgIcon fontSize="small">
        <AccountCircle />
      </SvgIcon>
    )
  },
  {
    title: 'Manage Contents',
    path: '/manageContents',
    icon: (
      <SvgIcon fontSize="small">
        <FeaturedPlayListSharpIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/admin/account',
    icon: (
      <SvgIcon fontSize="small">
        <Logout />
      </SvgIcon>
    )
  },
]