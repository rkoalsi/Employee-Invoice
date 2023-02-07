import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DeleteForever, Edit } from '@mui/icons-material';

export default function EstimatesTable(props: any) {
  const { columns, rows, setOpen, setValues, setIsEdit, deleteData } = props;
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label='simple table'
        id={'estimate-table'}
      >
        <TableHead>
          <TableRow>
            {columns.map((c: string, i: Number) => (
              <TableCell key={c}>{c}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow
              key={`${row.customer}${row.created_at} `}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.customer.name}
              </TableCell>
              {row.products.map((p: any) => (
                <TableRow>
                  <TableCell>{p.product.name}</TableCell>
                  <TableCell>{p.amount}</TableCell>
                </TableRow>
              ))}

              <TableCell component='th' scope='row'>
                INR {row.total}
              </TableCell>
              <TableCell>{new Date(row.created_at).toTimeString()}</TableCell>
              <TableCell>
                <DeleteForever
                  id={'delete-estimate'}
                  onClick={() => deleteData(row._id)}
                />
              </TableCell>
              <TableCell>
                <Edit
                  id={'edit-estimate'}
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
