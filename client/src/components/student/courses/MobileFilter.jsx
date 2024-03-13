import React, { useState } from "react";
import Slider from "react-slick";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from '@mui/icons-material/Close';
import {
  Badge,
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  styled,
} from "@mui/material";

const H1 = styled(Typography)({
  fontFamily: "",
  color: "#000",

});

const H2 = styled(Typography)({
  variant: "h6",
  color: "#000",
  paddingLeft: "15px",
  paddingTop: "5px",
});

const Ul = styled(ListItem)({

  height: "25px",
  paddingTop: "0px",
  paddingBottom: "0px",
});

const Lbtn = styled(ListItemButton)({
  paddingBottom: "1px",
  paddingTop: "1px",
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MobileFilter = ({ filters, selectedFilters, dispatch }) => {
  const [open, setOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);

  const handleClickOpen = (title) => {
    setSelectedTitle(title);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 10000,
    slickNext: false,
    slickPrevious: false,
    swipe: true,
    prevArrow: <div></div>,
    nextArrow: <div></div>,
  };

  return (
    <Slider {...settings}>
      {filters.map((card) => (
        <div key={card.id}>
          <Badge
            sx={{ marginTop: '8px', marginLeft: '10px' }}
            badgeContent={selectedFilters[card?.name].length}
            color="error"
          >
            <Box></Box>
            <Button
              size="small"
              variant="outlined"
              onClick={() => handleClickOpen(card.title)}
              style={{
                borderRadius: "15px",
                height: "28px",
                display: "block",
                overflow: "hidden",
                borderColor: "#808080",
                width: '90%'
              }}
            >
              <H1 variant="body2">{card.title} </H1>
              <CloseIcon fontSize="small" />
            </Button>
          </Badge>
          <Dialog
            open={open && selectedTitle === card.title}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{card.title}</DialogTitle>
            <DialogContent>
              <DialogContentText paddingRight={10} id="alert-dialog-slide-description">
                <List sx={{ width: "100%", }} size="small">
                  {card.elements.map((element, index) => (
                    <Ul key={index}>
                      <Lbtn size="small">
                        <ListItemIcon>
                          <Checkbox
                            checked={selectedFilters?.[card?.name]?.includes(element)}
                            onChange={e => dispatch(e, element, card?.name)}
                            size="small"
                          />
                          <H2 variant="body2">{element}</H2>
                        </ListItemIcon>
                      </Lbtn>
                    </Ul>
                  ))}
                </List>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      ))}
    </Slider>
  );
};

export default MobileFilter;