import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import SubCard from "./subCard";

const data = [
    {
        backgroundImage: "https://ideogram.ai/api/images/direct/PYfGTx53RoG521zTfHW2HA.jpg",
        title: "Dolefine man go home",
        description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    },
    {
        backgroundImage: 'https://ideogram.ai/api/images/direct/uZortqZcTDG4roj7QF7Yrw.jpg',
        title: "Dolefine man go home",
        description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    },
    {
        backgroundImage: 'https://ideogram.ai/api/images/direct/t1Wz4JEdTMCR97xkdvZjSg.jpg',
        title: "Dolefine man go home",
        description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    },
    // Add more objects as needed
];

function AutoPlay() {
    const { breakpoints } = useTheme();
    const md = useMediaQuery(breakpoints.down("md"));
    const sm = useMediaQuery(breakpoints.down("sm"));
    const settings = {

        dots: false,
        infinite: true,
        speed: 200,
        slidesToShow: md ? (sm ? 1 : 2) : 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        swipe: true,
        nextArrow: <SamplePrevArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={`${className} hide-arrow`} style = {{ ...style, display: "none", background: "" }} onClick = { onClick } />
    )
  }

return (
    <>
        <Box sx={{ marginTop: "10px", marginBottom: "25px", width: "90vw" }}>
            <Slider {...settings}>
                {data.map((item, index) => (
                    <Box key={index} >
                        <SubCard item={item} index={index} />
                    </Box>
                ))}

            </Slider>
        </Box>
    </>
);
}

export default AutoPlay;