import React, { useEffect, useState } from 'react'
import Layout from '../../layouts/Layout'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import queryString from "query-string";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Container, Grid, IconButton, Table, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { Bookmarks, CopyAll, Share } from '@mui/icons-material';
import { courseDetails, subscribe } from '../../utils/api';
import { formatTime } from '../../utils/helper';
import { days } from '../../utils/constants';

const CourseDetails = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState();
    const data = useSelector((store) => store.data.user);
    useEffect(() => {
        try {
            const fetchData = async () => {
                await courseDetails(id).then(
                    (res) => res && setDetails(res)
                );
            };
            fetchData();
        } catch (error) {
            console.log(error.message);
        }
    }, [id]);

    async function handleClick() {
        setLoading(true);
        await subscribe({ user: data?._id, id })
        await courseDetails(id).then(
            (res) => res && setDetails(res) && setLoading(false)
        );
    }
    const handleWhatsAppShare = (message) => {
        const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    };
    return (
        <Layout>
            <Container sx={{ mt: { xs: 2, md: 4 } }}>
                <Box
                    maxWidth={9999}
                    height={150}
                    sx={{
                        background: `url(${process.env.REACT_APP_BASE_URL}/${details?.image} ), lightgray 50% / cover no-repeat`,
                        borderRadius: "4px",
                    }}
                >
                    <Typography></Typography>
                </Box>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={4} marginTop={2}>
                        <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                            alignItems="right"
                            display="flex"
                            justifyContent="right"
                        >
                            <Card sx={{}}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={`${process.env.REACT_APP_BASE_URL}/${details?.image}`}
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {details?.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {details?.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Tooltip placement="top" title="Share course">
                                        <IconButton onClick={() => handleWhatsAppShare(`${process.env.REACT_APP_URL}/#/courseDetails/${details?._id}`)}>
                                            <Share />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip placement="top" title="Copy link">
                                        <IconButton
                                            onClick={() => { navigator.clipboard.writeText(`${process.env.REACT_APP_URL}/#/courseDetails/${details?._id}`) }}
                                        >
                                            <CopyAll />
                                        </IconButton>
                                    </Tooltip>
                                </CardActions>
                            </Card>
                            <Card sx={{ mt: 1, mb: 1 }}>
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            sx={{ bgcolor: 'secondary' }}
                                            aria-label="recipe"
                                            src={details?.author?.profilePic}
                                            alt={details?.author?.name}
                                        />
                                    }

                                    title={details?.author?.name}
                                    subheader="course author"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {details?.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                margin: { sx: 1, sm: 1, md: 0, lg: 0, xl: 0 },
                                mt: { md: 2, lg: 2, xl: 2 },
                                marginLeft: { md: 2, lg: 2, xl: 2 },
                            }}
                        >
                            <Card>
                                <CardHeader
                                    action={
                                        <IconButton aria-label="settings" gap="3">
                                            <Bookmarks />
                                        </IconButton>
                                    }
                                    title="Course Details"
                                    subheader=""
                                />
                                <CardContent>
                                    <Table>
                                        <TableBody>
                                            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                                                <TableCell>Subject</TableCell>
                                                <TableCell component="th" scope="row" />
                                                <TableCell align="left">: &nbsp;&nbsp; {details?.subject}</TableCell>
                                            </TableRow>
                                            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                                                <TableCell>Language</TableCell>
                                                <TableCell component="th" scope="row" />
                                                <TableCell align="left">: &nbsp;&nbsp; {details?.language}</TableCell>
                                            </TableRow>
                                            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                                                <TableCell>Course Duration</TableCell>
                                                <TableCell component="th" scope="row" />
                                                <TableCell align="left">: &nbsp;&nbsp; {details?.duration} days</TableCell>
                                            </TableRow>
                                            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                                                <TableCell> Class Timing</TableCell>
                                                <TableCell component="th" scope="row" />                                                <TableCell align="left">: &nbsp;&nbsp; {`${formatTime(details?.time?.[0])} - ${formatTime(details?.time?.[1])}`}</TableCell>
                                            </TableRow>
                                            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                                                <TableCell>Available Days</TableCell>
                                                <TableCell component="th" scope="row" />                                                <TableCell align="left">
                                                    : &nbsp;&nbsp; {details?.availableDays?.map(x => days[x - 1]?.name?.slice(0, 3)).join(' + ')}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                                                <TableCell>Subscription Type</TableCell>
                                                <TableCell component="th" scope="row" />
                                                <TableCell align="left">: &nbsp;&nbsp; {details?.subscription_type}</TableCell>
                                            </TableRow>
                                            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                                                <TableCell>Course Fee</TableCell>
                                                <TableCell component="th" scope="row" />
                                                <TableCell align="left">
                                                    : &nbsp;&nbsp; {details?.subscription_type === 'Paid' ? `Rs. ${details?.amount} /-` : 'N/A'}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                            {details?.subscribers?.includes(data?._id) ? (
                                <Button sx={{ mt: 3, mb: 3 }} variant="blur">
                                    SUBSCRIBED
                                </Button>
                            ) : (
                                <Button
                                    sx={{ mt: 3, mb: 3 }}
                                    variant="outlined"
                                    onClick={handleClick}
                                >
                                    {loading && <CircularProgress color="inherit" size={18} />}&nbsp;&nbsp;
                                    SUBSCRIBE NOW
                                </Button>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default CourseDetails