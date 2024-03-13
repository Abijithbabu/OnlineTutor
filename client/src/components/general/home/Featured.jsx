import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

const Featured = ({data}) => {
  const navigate = useNavigate()
  const backgroundImg = 'https://www.slu.edu/give/-img/cammy-fuller.jpg'
  const theme = useTheme();
  return (
    <Box
      onClick={()=>navigate(`/courseDetails/${data[0]?._id}`)}
      sx={{
        backgroundImage: `linear-gradient(to left, transparent, ${theme.palette.secondary.main}), url(${process.env.REACT_APP_BASE_URL}/${data[0]?.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // width: 200, 
        // height: 200,
        position: 'relative',

        borderRadius: 3,
        p: 5,
        alignItems: 'center',
        justifyContent: 'center',
      }} >
      <Typography pb={2}> Featured </Typography>
      <Typography pb={6} variant='h4'>{data[0]?.title}</Typography>
      <IconButton aria-label="play/pause" sx={{ bgcolor: "primary.main", }}>
        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
      </IconButton>
      <Typography variant="body2" color="text.secondary" pt={2} >
        {data[0]?.description}
      </Typography>
    </Box >
  )
}

export default Featured