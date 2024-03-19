import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";

const About = ({data,dispatch}) => {

  const handleUpdate = (e) => {
    const newData = data;
    newData[e.target.name] = e.target.value;
    dispatch({ ...newData });
  };
  return (
    <Grid container spacing={3} marginTop={2}>
      <Grid item xs={12} md={4} >
        <Box
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Card sx={{ maxWidth: 999 }}>
            <CardHeader
              title="Details"
              subheader='basic details'
            />
            <CardContent>
                <TextField
                  fullWidth
                  id="institution"
                  name="institution"
                  value={data?.institution || ''}
                  onChange={handleUpdate}
                  label="Institution / college"
                  variant="standard"
                  sx={{pb:2}}
                />
                <TextField
                  fullWidth
                  required
                  id="name"
                  name="name"
                  value={data?.name || ''}
                  onChange={handleUpdate}
                  label="Adminstrator"
                  variant="standard"
                  sx={{pb:2}}
                />
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  value={data?.email || ''}
                  onChange={handleUpdate}
                  label="Email Address"
                  variant="standard"
                  sx={{pb:2}}
                />
            </CardContent>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Card sx={{ pb: 5.5 }}>
            <CardHeader
              title='About'
              subheader="description"
            />
            <CardContent>
              <TextField
                id="description"
                name="bio"
                label="Brief Description *"
                value={data?.bio || ''}
                onChange={handleUpdate}
                fullWidth
                autoComplete="Description"
                multiline
                rows={4}
                helperText="Brief Description (about 100-200 words)"
              />
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default About;