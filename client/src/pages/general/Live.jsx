import * as React from 'react';
import { courseDetails } from '../../utils/api';
import { Backdrop, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Live() {

  const { roomID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((store) => store.data.user);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await courseDetails(roomID).then(res => {
          const payload = {
            roomID,
            userID: user?._id,
            username: user?.name,
            author: res?.author?._id,
            participants: res?.subscribers
          }
          dispatch({ type: 'live', payload }) && navigate('/joinlive')
        })

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color="inherit" />&nbsp;&nbsp; Joining Live
    </Backdrop>
  )
}
