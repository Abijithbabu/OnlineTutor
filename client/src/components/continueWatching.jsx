import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';

const ContinueWacting = () => {
  const backgroundImg = 'https://www.slu.edu/give/-img/cammy-fuller.jpg'
  const theme = useTheme();
  return (
    <Box sx={{
      backgroundImage: `linear-gradient(to left, transparent, ${theme.palette.secondary.main}), url(${backgroundImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      // width: 200, 
      // height: 200,
      position: 'relative', // Add position relative to overlay gradient
      borderRadius: 3,
      p: 5,
      alignItems: 'center', // Center content vertically
      justifyContent: 'center', // Center content horizontally
    }} >
      <Typography pb={2}> ContinueWacting </Typography>
      <Typography pb={6} variant='h4'> mathematics formula </Typography>
      <IconButton aria-label="play/pause" sx={{ bgcolor: "primary.main", }}>
        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
      </IconButton>
      <Typography variant="body2" color="text.secondary" pt={2} >
        Lizards are a widespread group of squamate reptiles, with over 6,000<br />
        species, ranging across all continents except Antarctica
      </Typography>
    </Box>
  )
}

export default ContinueWacting