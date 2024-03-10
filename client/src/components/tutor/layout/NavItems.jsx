
import { SvgIcon } from '@mui/material';
import FeaturedPlayListSharpIcon from '@mui/icons-material/FeaturedPlayListSharp';
import { CoPresentRounded, Dashboard, LiveTv, Logout, School } from '@mui/icons-material';
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
    title: 'Courses',
    path: '/myCourses',
    icon: (
      <SvgIcon fontSize="small">
        <School />
      </SvgIcon>
    )
  },
  {
    title: 'Applicants',
    path: '/manageApplicants',
    icon: (
      <SvgIcon fontSize="small">
        <CoPresentRounded />
      </SvgIcon>
    )
  },
  {
    title: 'Live Classes',
    path: '/liveClasses',
    icon: (
      <SvgIcon fontSize="small">
        <LiveTv />
      </SvgIcon>
    )
  },
  {
    title: 'Logout',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <Logout />
      </SvgIcon>
    )
  },
]