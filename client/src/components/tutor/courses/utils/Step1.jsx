import * as React from "react";
import { Alert, Box, Grid, TextField, Typography } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";

export default function Step1({ data, dispatch }) {

  const fileInputRef = React.useRef(null);
  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    dispatch({ ...data, image: file });
  };

  const handleChange = (e) => {
    dispatch({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ flexGrow: 1 }} px={1.5} display={'flex'} justifyContent={'center'}>
      <Grid container spacing={1} maxWidth={600} p={5}>
        <Typography variant="h6" gutterBottom>
          Basic Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="title"
              name="title"
              label="Course Title"
              value={data.title || ''}
              onChange={handleChange}
              fullWidth
              autoComplete="Title"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="Subtitle"
              name="subtitle"
              label="Course Subtitle"
              value={data.subtitle || ''}
              onChange={handleChange}
              fullWidth
              autoComplete="Subtitle"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Course Description *"
              value={data.description || ''}
              onChange={handleChange}
              fullWidth
              autoComplete="Description"
              multiline
              rows={3}
              helperText="Short Description (about 10-20 words)"
            />
          </Grid>

          <Grid item xs={12} >
            <Box
              sx={{
                width: 200,
                height: 100,
                cursor: "pointer",
                backgroundColor: "#212121",
                "&:hover": {
                  backgroundColor: "#424242",
                  opacity: [0.9, 0.8, 0.7],
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
              onClick={handleFileSelect}
            >
              {data?.image ? (
                <img
                  style={{ width: 240, height: 135, padding: 22 }}
                  src={typeof (data.image) == 'object' ? URL.createObjectURL(data.image) : `${process.env.REACT_APP_BASE_URL}/${data.image}`}
                />
              ) : (
                <React.Fragment>
                  <AddAPhoto />
                  <Typography sx={{ mt: 1, fontSize: 13 }}>
                    Upload Thumbnail
                  </Typography>
                </React.Fragment>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Alert color="primary" severity="info" sx={{ mt: 3, fontSize: 13 }}>
              <ul style={{ margin: "0", padding: "0" }}>
                <li> Make your thumbnail 1280 by 720 pixels (16:9 ratio)</li>
                <li>Ensure that your thumbnail is less than 2MB</li>
                <li>Use a JPG, PNG, or JPEG file format</li>
              </ul>
            </Alert>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
