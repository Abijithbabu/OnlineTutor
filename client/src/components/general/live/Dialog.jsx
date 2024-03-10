import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function ResponsiveDialog({ id }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <Dialog
                sx={{ p: 8 }}
                fullScreen={fullScreen}
                open={true}
                onClose={() => { }}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Forgot to Subscribe Course !"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText variant='body2'>
                        It seems like you havent subscribed to this course,
                        According to our policy subscription is mandatory to attend live class to encourage Tutor to bring their best.
                        But don't worry it will only take a couple of minutes to Subscribe and come back.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ m: 3 }} variant='contained' onClick={() => navigate(`/courseDetails/${id}`)}>
                        Subscribe Course
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
