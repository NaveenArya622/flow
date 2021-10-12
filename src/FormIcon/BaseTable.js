import React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
const BaseTable = ({children}) => {
    return (
        <TableContainer sx={{ borderRadius: 0}} component={Paper}>
            <Table sx={{ minWidth: 650, border: "1px solid gray"}} aria-label="simple table">{
                children
            }
            </Table>
        </TableContainer>
    );
}

export default BaseTable