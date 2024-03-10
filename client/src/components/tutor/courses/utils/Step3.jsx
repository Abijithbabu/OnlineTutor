import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Box, MenuItem, Select } from "@mui/material";
import { CurrencyRupee, LocalOffer } from '@mui/icons-material'
const Step3 = ({ data, dispatch }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Box sx={{ flexGrow: 1 }} px={1.5} display={'flex'} justifyContent={'center'}>
      <Grid container spacing={1} maxWidth={800} p={5}>
        <Typography variant="h6" component="div">
          Review and complete
        </Typography>
        <Grid container pt={1} spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="subject"
              name="subject"
              onChange={handleChange}
              value={data?.subject ?? ""}
              label="subject"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="language"
              name="language"
              onChange={handleChange}
              value={data?.language ?? ""}
              label="language"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="demo-simple-select-label">Course Duration</InputLabel>
              <Input
                id="duration"
                name="duration"
                type="number"
                onChange={handleChange}
                value={data?.duration ?? ''}
                label="duration"
                fullWidth
                endAdornment={<InputAdornment position="start">Days</InputAdornment>}
                variant="standard"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel id="demo-simple-select-label">Subscription Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Subscription"
                name="subscription_type"
                onChange={handleChange}
                value={data?.subscription_type ?? ''}
              >
                <MenuItem value={'Paid'}><CurrencyRupee sx={{ height: '20px' }} /> &nbsp;Paid Course</MenuItem>
                <MenuItem value={'Free'}><LocalOffer sx={{ height: '20px' }} /> &nbsp;Free Course</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
              <Input
                type="number"
                id="amount"
                name="amount"
                disabled={data?.subscription_type === 'Free' ?? false}
                size="small"
                value={data?.amount ?? 0}
                onChange={handleChange}
                startAdornment={<InputAdornment position="start">₹</InputAdornment>}
              />
              <FormHelperText id="form-helper-text">No need if subscription is not paid</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step3;
