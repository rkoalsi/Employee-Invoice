import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DeleteForever, Edit } from '@mui/icons-material';

export default function ProductTable(props: any) {
  const { columns, rows, setOpen, setValues, setIsEdit, deleteData } = props;
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label='simple table'
        id={'product-table'}
      >
        <TableHead>
          <TableRow>
            {columns.map((c: string) => (
              <TableCell key={c}>{c}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row' id={'#name'}>
                {row.name}
              </TableCell>
              <TableCell id={'#sku'}>{row.sku}</TableCell>
              <TableCell id={'#hsn'}>{row.hsn}</TableCell>
              <TableCell id={'#gst'}>{row.gst}</TableCell>
              <TableCell id={'#price'}>{row.price}</TableCell>
              <TableCell id={'#stock'}>{row.stock}</TableCell>
              <TableCell>
                <DeleteForever
                  onClick={() => deleteData(row._id)}
                  id={'delete-product'}
                />
              </TableCell>
              <TableCell>
                <Edit
                  id={'edit-product'}
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
