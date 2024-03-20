import { CloudUpload } from '@mui/icons-material';
import { Box, Button, Typography, useTheme } from '@mui/material'
import React from 'react'

const Banner = ({ data, dispatch }) => {
  const theme = useTheme()
  const image = typeof (data?.image) == 'object' ? URL.createObjectURL(data?.image) : `${process.env.REACT_APP_BASE_URL}/${data?.image}`
  const fileInputRef = React.useRef(null);
  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    dispatch({ ...data, image: file });
  };
  return (
    <Box
      maxWidth={9999}
      height={230}
      display={'flex'}
      sx={{
        cursor: "pointer",
        background: `url(${image}) lightgray 50% / cover no-repeat`,
        borderRadius: "14px",
      }}
      onClick={handleFileSelect}
    >
      <Typography
        variant='h4'
        sx={{
          m: 'auto', p: 2, borderRadius: "8px",
          background: `linear-gradient(to left, transparent, ${theme.palette.secondary.main})`,
          fontFamily: 'monospace',
          fontWeight: 800,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}>
        {data?.institution?.toUpperCase()}
      </Typography>
      <Button variant='contained' sx={{ p: 3, m: 2.5, mr: 'auto', maxHeight: 30, position: 'absolute' }}>
        <CloudUpload />
        &nbsp;&nbsp;Upload Image
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Box>
  )
}

export default Banner