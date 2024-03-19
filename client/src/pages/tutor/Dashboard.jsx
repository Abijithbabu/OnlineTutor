import React, { useEffect, useState } from 'react'
import TutorLayout from '../../layouts/TutorLayout'
import { Box, CircularProgress, Container, Paper, Stack, Typography, styled, useMediaQuery } from '@mui/material'
import { ApexChart } from '../../components/tutor/dashboard/ApexChart'
import { fetchCourses } from '../../utils/api'
import { useSelector } from 'react-redux'
import { useTheme } from '@emotion/react'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 160,
  lineHeight: '60px',
}));

const Dashboard = () => {
  const user = useSelector((state) => state?.data?.user);
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('md'));
  const obj = { revenue: 0, courses: 0, subscribers: 0 }
  data?.map(x => {
    obj.courses++
    obj.subscribers += x.subscribers.length
    if (x.subscription_type === 'Paid') {
      obj.revenue += x.subscribers.length * x.amount
    }
  })

  const fetchData = async () => {
    await fetchCourses(user?._id).then((res) => {
      res && setData(res);
      setIsDataLoaded(true);
    });
  };

  useEffect(() => {
    user && fetchData();
  }, [user]);
  return (
    <TutorLayout>
      {isDataLoaded ? (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // py: 8
          }}
        >
          <Container maxWidth="xl">
            <Stack spacing={3}>
              <Stack
                direction="column"
                justifyContent="space-between"
                spacing={4}
              >
                <Stack spacing={1}>
                  <Typography variant="h4">
                    Dashboard
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'background.default',
                    display: 'grid',
                    gridTemplateColumns: { md: '1fr 1fr 1fr' },
                    gap: 2,
                  }}
                >
                  <Item elevation={12}>
                    Revenue Generated
                    <Typography variant="h4">
                      ₹ {obj.revenue}
                    </Typography>
                  </Item>
                  <Item elevation={12}>
                    Total courses published
                    <Typography variant="h4">
                      {obj.courses}
                    </Typography>
                  </Item>
                  <Item elevation={12}>
                    subscribers gained
                    <Typography variant="h4">
                      {obj.subscribers}
                    </Typography>
                  </Item>
                </Box>
                <Stack spacing={1} display={'flex'} direction={sm ? "row" : 'column'} justifyContent={'center'} alignContent={'center'}>
                <Stack spacing={1}>
                  <ApexChart data={data} type={'bar'} />
                </Stack>
                <Stack spacing={1}>
                  <ApexChart data={data} type={'line'} />
                </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </Box>
      ) : (
        <p><CircularProgress color="inherit" size={18} />&nbsp;&nbsp;Loading...</p>
      )}

    </TutorLayout>
  )
}

export default Dashboard