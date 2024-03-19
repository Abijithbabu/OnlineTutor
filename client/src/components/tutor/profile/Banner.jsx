import { CloudUpload } from '@mui/icons-material';
import { Box, Button } from '@mui/material'
import React from 'react'

const Banner = ({ data, dispatch }) => {

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
      height={250}
      display={'flex'}
      sx={{
        cursor: "pointer",
        background: `url(${image}) lightgray 50% / cover no-repeat`,
        borderRadius: "14px",
      }}
      onClick={handleFileSelect}
    >
      <Button variant='contained' sx={{ p: 3, m: 2.5, ml: 'auto', maxHeight: 30 }}>
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