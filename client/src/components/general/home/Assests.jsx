import * as React from "react";
import { motion } from "framer-motion";
import { Grid, Paper } from "@mui/material";
import AssestCard from "./AssestCard";

const data = [
    {
        title: 'Online Access',
        description: 'Enable users to continue course content from anywhere.'
    }, {
        title: 'Personalize Courses',
        description: 'Browse and find the perfect course for your studies.'
    }, {
        title: 'Individual Attention',
        description: 'Online tuition provides personalized attention to each student.'
    }, {
        title: 'Paid and Free courses',
        description: 'Access millions of courses both of paid and free subscriptions.'
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

const Assests = () => (
    <motion.ul variants={container} initial="hidden" animate="visible" >
        <Grid container spacing={2} >
            {data.map((data, index) => (<Grid item xs={6} >
                <Paper key={index} variants={item} component={motion.div}><AssestCard data={data}/></Paper>
            </Grid> ))}
        </Grid>
    </motion.ul>
);

export default Assests