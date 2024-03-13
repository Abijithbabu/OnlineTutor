import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const SubCard = ({ item, index }) => {
    return (
        <Box sx={{ mr: 2 }}>
            <Box
                sx={{
                    backgroundImage: `linear-gradient(to bottom, transparent, #000), url(${process.env.REACT_APP_BASE_URL}/${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%', // Adjusted width to fill the container
                    height: 200,
                    position: 'relative',
                    borderRadius: 3,
                    p: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '100px',
                }}
            >
                <Typography pb={5}></Typography>
                <IconButton aria-label="play/pause" sx={{ bgcolor: 'primary.main' }}>
                    <PlayArrowIcon sx={{ height: 20, width: 20 }} />
                </IconButton>
                <Typography pt={0} variant="h6">
                    {item.title}
                </Typography>
                <Typography sx={{fontSize:'11.5px',fontWeight:'light'}} variant="body2" color="text.secondary" pt={1}>
                    {item.description}
                </Typography>
            </Box>
        </Box >
    );
};

export default SubCard;