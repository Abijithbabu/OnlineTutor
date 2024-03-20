import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { days } from "../../../../utils/constants";
import { Paper } from '@mui/material';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  cursor: 'pointer',
  color: theme.palette.text.secondary,
}));

export default function Step2({ data, dispatch }) {

  const handleChange = (time) => dispatch((prev) => ({ ...prev, time }))

  const handleClick = (id) => {
    dispatch(prev => {
      let arr = prev.availableDays
      if (arr.includes(id)) {
        arr = arr.filter(x => x !== id)
      } else {
        arr.push(id)
        arr.sort((a, b) => a - b);
      }
      return ({ ...prev, availableDays: arr })
    })
  }

  return (
    <Box sx={{ flexGrow: 1 }} px={1.5} display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <Grid container spacing={1} maxWidth={600} p={5}>
        <Typography variant="body2">
          choose time slots and days of your convinence for classes
        </Typography >

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={data.availableDays.length === 7}
                onChange={(event) => dispatch(prev => ({ ...prev, availableDays: event.target.checked ? [1, 2, 3, 4, 5, 6, 7] : [] }))}
              />
            }
            label={
              <span style={{ fontSize: "14px" }}>Select all days</span>
            }
          />
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              {days.map(x => (
                <Grid key={x.id} item xs={3} onClick={() => handleClick(x.id)}>
                  <Item sx={{ background: data.availableDays.includes(x.id) ? "#0DA3E8" : "initial", color: data.availableDays.includes(x.id) ? '#ffffff' : 'initial' }}>
                    {x.name}
                  </Item>
                </Grid>
              ))}

            </Grid>
          </Box><br />
          <Typography variant="subtitle2">
            Available days : {data.availableDays.map(x => days[x - 1]?.name?.slice(0, 3)).join(' + ')}</Typography>
        </Grid>

        <Grid item xs={12} sm={8}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker
                variant='standard'
                label="Class Time"
                value={dayjs(data?.time) ?? dayjs()}
                onChange={(newValue) => handleChange(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Box>
  );
}