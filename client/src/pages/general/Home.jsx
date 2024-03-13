import { Box, Container, Paper, Stack } from '@mui/material'
import { Grid } from '@mui/material'
import React from 'react'
import Layout from '../../layouts/Layout'
import AutoPlay from '../../components/general/home/AutoPlay'
import { getCourses } from '../../utils/api'
import Featured from '../../components/general/home/Featured'
import Assests from '../../components/general/home/Assests'

const Home = () => {
    const [data, setData] = React.useState(["", '', '', '', '', '', '']);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        try {
            setLoading(true)
            const fetchData = async () => {
                await getCourses()
                    .then((res) => res && setData(res))
                    .then(() => setLoading(false))
            }
            fetchData();
        } catch (error) {
            console.log(error.message);
        }
    }, []);
    return (
        <Container>
            <Layout>
                <Grid container spacing={2} >
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ mt: 2, borderRadius: 3 }} >
                            <Featured data={data} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box ><Assests /></Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box><AutoPlay data={data} /></Box>
                    </Grid>
                    {/* <Grid item xs={8}>
                    <Box sx={{ bgcolor: "primary.main", mt: 2 }}>xs=8</Box>
                </Grid> */}
                </Grid>
            </Layout>
        </Container>
    )
}

export default Home