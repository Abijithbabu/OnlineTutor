import * as React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, IconButton, Skeleton } from "@mui/material";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { bookmark, getCourses } from "../../../utils/api";
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const MachingCard = styled(Box)({
  minHeight: "30px",
  // marginTop: "32px",
  paddingTop: "0.5px",
  paddingBottom: "px",
  minWidth: "0px",
  maxWidth: "350px",
});

const H1 = styled(Typography)({
  variant: "body1",
  color: "#000",
  paddingLeft: "1px",
  paddingTop: "1px",
  fontSize: "13px",
  fontWeight: "600",
  lineHeight: "normal",
});

const H3 = styled(Typography)({
  variant: "body1",
  color: "#000",
  fontSize: "12px",
  paddingLeft: "px",
  paddingRight: "px",
  paddingTop: "1px",
});

const ImageSlot = styled(CardMedia)({
  minHeight: "1px",
  margin: "3px",
  marginTop: "6px",
  borderRadius: "2px",
  backgroundRepeat: "no-repeat, no-repeat",
  boxShadow: "0px 0px 1px 0px #07191D inset",
});

const CardTime = styled(Typography)({
  color: "#484848",
  textAlign: "right",
  fontSize: "11px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  padding: "3px 6px 0px 0px",
});

const defaultTheme = createTheme();

export default function Cards({ filter }) {
  const navigate = useNavigate();
  const user = useSelector(store => store.data.user)
  const [checked, setChecked] = React.useState(false);
  const [data, setData] = React.useState(["", '', '', '', '', '', '']);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    try {
      setLoading(true)
      const fetchData = async () => {
        await getCourses(filter)
          .then((res) => res && setData(res))
          .then(() => setLoading(false))
      }
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [filter,checked]);

  const handleBookmark = async (id) => {
    await bookmark({ id, user: user._id }).then(() => setChecked(prev => !prev))
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <motion.div
          className="container"
          variants={container}
          initial="hidden"
          animate="visible"
          sx={{ py: { sm: 0, xs: 0, md: 0, lg: 0 }, paddingRight: { sm: 0, xs: 0, md: 0, lg: 0 }, marginRight: { sm: 0, sx: 0, md: 0, lg: 0 } }}
        >
          <Container sx={{ py: { sm: 0, xs: 0, md: 0, lg: 0 }, paddingRight: { sm: 0, xs: 0, md: 0, lg: 0 }, marginRight: { sm: 0, sx: 0, md: 0, lg: 0 }, paddingLeft: { sm: 0, xs: 0, md: 3, lg: 2 } }} maxWidth="md">
            <Grid container spacing={2}>
              {data.map((card, index) => (
                <Grid item key={index} xs={6} sm={4} md={4} lg={3}>
                  <MachingCard>
                    <motion.div
                      className="item "
                      variants={item}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {loading ? (
                        <Skeleton
                          variant="rectangular"
                          width={210}
                          height={118}
                        />
                      ) : (
                        <>
                          <CardTime>{new Date(card.createdAt).toDateString()}</CardTime>
                          <ImageSlot
                            onClick={() =>
                              navigate(`/courseDetails/${card._id}`)
                            }
                            key={`media-${card._id}`}
                            component="div"
                            sx={{
                              pt: "56.25%",
                              cursor: "pointer",
                            }}
                            image={
                              card.image &&
                              `${process.env.REACT_APP_BASE_URL}/${card.image}`
                            }
                          />
                        </>
                      )}
                      <CardContent

                        sx={{
                          flexGrow: 1,
                          px: 0
                        }}
                      >
                        {loading ? (
                          <Box sx={{ pt: 0.5 }}>
                            <Skeleton />
                            <Skeleton width="60%" />
                          </Box>
                        ) : (
                          <>
                            <Grid container>
                              <Grid item xs={10} md={10} sm={10} lg={10}>
                                <H1>{card.title} / {card.subject}</H1>
                                <H1>by {card.tutor}</H1>
                                <H1>{card?.authorDetails?.[0]?.institution
}</H1>
{console.log(card)}
                              </Grid>
                              <Grid item xs={2} md={2} sm={2} lg={2}>
                                <IconButton
                                  sx={{ pt: 0, paddingRight: 0 }}
                                  aria-label="add to favorites"
                                  onClick={() => handleBookmark(card._id)}
                                >
                                  {card?.likes?.includes(user._id) ? (
                                    <BookmarkIcon fontSize="small" />
                                  ) : (
                                    <BookmarkBorderIcon fontSize="small" />
                                  )}
                                </IconButton>
                              </Grid>
                            </Grid>
                            <H3 variant="body2" component="poppins">
                              {card.roles}
                            </H3>
                          </>
                        )}
                      </CardContent>
                    </motion.div>
                  </MachingCard>
                </Grid>
              ))}
            </Grid>
            {!data?.length &&
              <Grid pt={12} item xs={12} display={'flex'} justifyContent={'center'} >
                <Typography>Oops! no results found, try clearing filters</Typography>
              </Grid>
            }
          </Container>
        </motion.div>
      </main>
    </ThemeProvider>
  );
}