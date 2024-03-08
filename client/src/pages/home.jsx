import { Box, Paper, Stack } from '@mui/material'
import { Grid } from '@mui/material'
import React from 'react'
import ContinueWacting from '../components/continueWatching'
import { EasyAssests } from '../layout/assests'
import AutoPlay from '../layout/purchased'
import Layout from '../layout/layout'

const Home = () => {
    return (
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
    )
}

export default Home