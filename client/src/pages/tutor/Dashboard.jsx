import React from 'react'
import TutorLayout from '../../layout/TutorLayout'
import { Box, Container, Stack, Typography } from '@mui/material'
import { ApexChart } from '../../components/tutor/dashboard/ApexChart'

const Dashboard = () => {
const data = []
  return (
    <TutorLayout>
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
                <ApexChart data={data} />
              </Stack>
              {/* {data.length ? <Table data={data} /> : <div>Loading...</div>} */}
            </Stack>
          </Container>
        </Box>
    </TutorLayout>
  )
}

export default Dashboard