import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
   },
   // hide last border
   '&:last-child td, &:last-child th': {
      border: 0,
   },
}));

export default function DataTable({ data, rows, handleBlock }) {
   console.log(data?.[0]);
   return (
      <TableContainer component={Paper} style={{ paddingTop: 25 }}>
         <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
               <TableRow>
                  {rows.map(row => <StyledTableCell key={row}>{row}</StyledTableCell>)}
                  <StyledTableCell>{data?.[0]?.title ? 'Created At':'Joined On'}</StyledTableCell>
                  {data?.[0]?.name && <StyledTableCell >Status</StyledTableCell>}
               </TableRow>
            </TableHead>
            <TableBody>
               {data.map((item) => (
                  <StyledTableRow key={item.name}>
                     {rows.map(row => <StyledTableCell key={row}>{item[row]}</StyledTableCell>)}
                     <StyledTableCell>{new Date(item.createdAt).toDateString()}</StyledTableCell>
                     {data?.[0]?.name && <StyledTableCell ><Button sx={{minWidth:110}} variant='contained' onClick={()=>handleBlock(item?._id)} color={item.status?'error':'info'}>{item.status ? 'Suspended' : 'Active'}</Button></StyledTableCell>}
                  </StyledTableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
