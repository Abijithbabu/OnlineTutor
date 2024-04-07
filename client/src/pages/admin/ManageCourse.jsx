import * as React from 'react';
import AdminLayout from '../../layouts/AdminLayout'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getCourse } from '../../utils/api';
import DataTable from '../../components/admin/DataTable';

const ManageCourse = () => {
    const [data, setData] = React.useState([])
    const [search, setSearch] = React.useState('')
    const [loading, setLoading] = React.useState(true)
    const fetchData = async () => {
        setLoading(true)
        await getCourse(search).then(res => setData(res))
        setLoading(false)
    }
    const handleRefresh = () => {
        setSearch('')
        fetchData()
    }
    React.useEffect(() => {
        fetchData()
    }, [])
    const rows = ['title', 'subtitle', 'tutor', 'subject', 'language']
    return (
        <AdminLayout>
            <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
                <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
                >
                    <Toolbar>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <SearchIcon color="inherit" sx={{ display: 'block' }} />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    placeholder="Search by email address, phone number, or user UID"
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: { fontSize: 'default' },
                                    }}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" sx={{ mr: 1 }} onClick={fetchData}>
                                    Search
                                </Button>
                                <Tooltip title="Reload">
                                    <IconButton onClick={handleRefresh}>
                                        <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                {loading ?
                    <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                        Loading ...
                    </Typography> :
                    data?.length ?
                        <DataTable data={data} rows={rows} /> :
                        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                            No users for this search result
                        </Typography>}
            </Paper>
        </AdminLayout>
    )
}

export default ManageCourse