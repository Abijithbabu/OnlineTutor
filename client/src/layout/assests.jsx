import * as React from "react";
import { motion } from "framer-motion";
import { Grid, Paper } from "@mui/material";
import AssestCard from "../components/assestCard";

const data = [
    {
        title: 'Offline Access',
        description: 'Enable users to download course content for offline viewing.'
    }, {
        title: 'Individual Attention',
        description: 'Online tuition provides personalized attention to each student.'
    }, {
        title: 'Individual Attention',
        description: 'Online tuition provides personalized attention to each student.'
    }, {
        title: 'Individual Attention',
        description: 'Online tuition provides personalized attention to each student.'
    }
]
const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1, scale: 1,
        transition: { delayChildren: 0.3, staggerChildren: 0.2 }
    }
};
const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

export const EasyAssests = () => (
    <motion.ul variants={container} initial="hidden" animate="visible" >
        <Grid container spacing={2} >
            {data.map((data, index) => (<Grid item xs={6} >
                <Paper key={index} sx={{ height: '11.6vw', width: '12vw' }} variants={item} component={motion.div}><AssestCard data={data}/></Paper>
            </Grid> ))}
        </Grid>
    </motion.ul>
);




















// <Grid item xs={6}>
//     <Paper sx={{ height: '11.6vw', width: '12vw' }} variants={item} component={motion.div}>hi</Paper>
// </Grid>
// <Grid item xs={6}>
//     <Paper sx={{ height: '11.6vw', width: '12vw' }} variants={item} component={motion.div}>hi</Paper>
// </Grid>
{/* {[0, 1, 2, 3].map((index) => (
            <motion.li key={index} className="item" variants={item} />
        ))} */}