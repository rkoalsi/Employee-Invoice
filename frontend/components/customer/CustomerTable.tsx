import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DeleteForever, Edit } from '@mui/icons-material';
import { deleteCustomer } from '../../api/customer';

export default function CustomerTable(props: any) {
  const { columns, rows, setOpen, setValues, setIsEdit, deleteCustom } = props;
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        id={'customer-table'}
        aria-label='simple table'
      >
        <TableHead>
          <TableRow>
            {columns.map((c: String) => (
              <TableCell>{c}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell>{row.shop}</TableCell>
              <TableCell>{row.gstin}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>
                <DeleteForever
                  onClick={() => deleteCustom(row._id)}
                  id={'delete-customer'}
                />
              </TableCell>
              <TableCell>
                <Edit
                  id={'edit-customer'}
                  onClick={() => {
                    setOpen(true);
                    setIsEdit(true);
                    setValues(row);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
