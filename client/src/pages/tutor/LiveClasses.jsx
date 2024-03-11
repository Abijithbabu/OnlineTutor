import React, { useEffect, useState } from 'react';
import TutorLayout from '../../layouts/TutorLayout';
import { useSelector } from 'react-redux';
import { fetchCourses } from '../../utils/api';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Stack, Tooltip, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CopyAll, Share } from '@mui/icons-material';

const LiveClasses = () => {
  const user = useSelector((state) => state?.data?.user);
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    user && fetchData();
  }, [user]);

  const fetchData = async () => {
    await fetchCourses(user?._id).then((res) => {
      setData(res);
      setIsDataLoaded(true);
    });
  };
  const handleWhatsAppShare = (message) => {
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };
  return (
    <TutorLayout>
      <Grid container spacing={4} p={5}>
        {isDataLoaded ?
          data?.map(item => (
            <Grid item key={item._id} minWidth={345} xs={12} md={6} lg={4}>

              <Card sx={{ maxWidth: 445 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={`${process.env.REACT_APP_BASE_URL}/${item.image}`}
                  title="course thumbnail"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.subtitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Tooltip placement="top" title="Share">
                    <IconButton onClick={() => handleWhatsAppShare(`${process.env.REACT_APP_URL}/#/live/${item._id}`)}>
                      <Share />
                    </IconButton>
                  </Tooltip>
                  <Tooltip placement="top" title="Copy link">
                    <IconButton
                      onClick={() => { navigator.clipboard.writeText(`${process.env.REACT_APP_URL}/#/live/${item._id}`) }}
                    >
                      <CopyAll />
                    </IconButton>
                  </Tooltip>
                  <Stack direction="row" width={"100%"} spacing={1} >
                  </Stack>
                  <Button
                    sx={{ minWidth: 110 }}
                    size="small"
                    variant='contained'
                    minWidth={40}
                    onClick={() => window.open(`${process.env.REACT_APP_URL}/#/live/${item._id}`, '_blank')}
                  >
                    Start Live
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )) : (
            <p>Loading...</p>
          )}
      </Grid>
    </TutorLayout>
  );
};

export default LiveClasses;
