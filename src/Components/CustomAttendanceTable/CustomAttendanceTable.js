import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CustomProgress from '../CustomProgress/CustomProgress';

export default function CustomAttendanceTable({ tableData, headData, type, ...props }) {
    return (
        <TableContainer>
            <Table sx={{ width: '100%' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headData.map((item, idx) => {
                            if (type === 'hidden' && [2,3].includes(idx)) {
                                return
                            }
                            return (
                                <TableCell><b>{(item.id == 1 && type == "hidden") ? "User Id" : item.title }</b></TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row, id) => {
                        return (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                { <TableCell component="th" scope="row">
                                    {id + 1}
                                </TableCell>}
                                < TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                {type !== 'hidden' && type !== "UserHidden" &&  <TableCell component="th" scope="row">
                                    {row.designation}
                                </TableCell>}
                                {type !== 'hidden' && <TableCell component="th" scope="row">
                                    {row.user_id}
                                </TableCell>}
                                {type === 'UserHidden' && <TableCell component="th" scope="row">
                                    {row.class}
                                </TableCell>}
                                {<TableCell component="th" scope="row" style={(row.day == "P") ? { color: 'green'} : {color: 'red'}}>
                                    {row.day}
                                </TableCell>}
                                <TableCell component="th" scope="row">
                                    <CustomProgress value={row.attendance} />
                                </TableCell>
                            </TableRow>
                        )
                    }
                    )}
                </TableBody>
            </Table>
        </TableContainer >
    );
}