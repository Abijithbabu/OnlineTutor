import { Box, Paper, Stack } from '@mui/material'
import { Grid } from '@mui/material'
import React from 'react'
import ContinueWacting from '../../components/general/layout/continueWatching'
import { EasyAssests } from '../../components/general/layout/assests'
import Layout from '../../layouts/Layout'
import AutoPlay from '../../components/general/home/AutoPlay'

const Home = () => {
    return (
        <Layout>
            <Grid container spacing={2} >
                <Grid item xs={8}>
                    <Paper sx={{ mt: 2, borderRadius: 3 }} ><ContinueWacting /></Paper>
                </Grid>
                <Grid item xs={4}>
                    <Box ><EasyAssests /></Box>
                </Grid>
                <Grid item xs={12}>
                    <Box><AutoPlay /></Box>
                </Grid>
                <Grid item xs={8}>
                    <Box sx={{ bgcolor: "primary.main", mt: 2 }}>xs=8</Box>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Home