import styled from "@emotion/styled";
import React, { useState } from "react";
import {
    Box,
    Card,
    Checkbox,
    Divider,
    Hidden,
    List,
    ListItem,
    ListItemIcon,
    Typography,
} from "@mui/material";
import { useEffect } from "react";
import MobileFilter from "./MobileFilter";
import { filterMenu } from "../../../utils/constants";

const FiliterCard = styled(Card)({
    display: "flex-row",
    align: "",

    height: "",
    marginTop: "10px",
    minWidth: "100px",
    maxWidth: "px",
});

const H1 = styled(Typography)({
    fontFamily: "",
    color: "#000",
    paddingLeft: "25px",
    paddingTop: "10px",
});

const H2 = styled(Typography)({
    variant: "h6",
    color: "#000",
    paddingLeft: "15px",
    paddingTop: "5px",
});

function Filter({ filter, apply }) {
    const initState = { subject: [], type: [], language: [] }
    const [selectedFilters, setSelectedFilters] = useState(initState);

    const handleCheckboxChange = (event, element, item) => {
        if (event.target.checked) {
            setSelectedFilters(prevSelected => ({ ...prevSelected, [item]: [...prevSelected[item], element] }))
        } else {
            setSelectedFilters(prevSelected => ({
                ...prevSelected, [item]: prevSelected[item].filter(item => item !== element)
            })
            );
        }
    }
    useEffect(() => {
        filter == 0 && setSelectedFilters(initState)
    }, [filter])
    useEffect(() => {
        apply(selectedFilters)
    }, [selectedFilters])

    return (
        <>
            <Hidden mdDown implementation="css">
                <FiliterCard>
                    {filterMenu.map((item) => (
                        <Box key={item.id} >
                            <H1>{item.title}</H1>
                            <List
                                sx={{
                                    width: "100%",
                                    mt: 0,
                                    mb: 2,
                                    maxHeight: "calc(220px - 10px)",
                                    overflowY: item.id === 2 ? "none" : 'scroll',
                                    // overflow: 'auto',
                                    '&::-webkit-scrollbar': {
                                        width: '0.2rem',
                                        '&-thumb': {
                                            backgroundColor: 'primary.main',
                                            width: '0.1rem',
                                            borderRadius: '1rem',
                                        },
                                    },
                                }}
                                size="small"
                            >
                                {item.elements.map((element, index) => (
                                    <ListItem key={index} value={element} sx={{
                                        padding: "0px",
                                        height: "15px",
                                        paddingTop: "20px",
                                        paddingBottom: "10px",
                                    }}>
                                        <ListItemIcon>
                                            <Checkbox
                                                size="small"
                                                checked={selectedFilters?.[item?.name]?.includes(element)}
                                                onChange={e => handleCheckboxChange(e, element, item?.name)}
                                            />
                                            <H2 variant="body2">{element}</H2>
                                        </ListItemIcon>
                                    </ListItem>
                                ))}
                            </List>
                            <Divider />
                        </Box>
                    ))}
                </FiliterCard>
            </Hidden >
            <Hidden mdUp implementation="css">
                <MobileFilter filters={filterMenu} selectedFilters={selectedFilters} dispatch={handleCheckboxChange} />
            </Hidden>
        </>
    );
}
export default Filter;