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
import { deleteEmployee } from '../../api/employee';

export default function EmployeeTable(props: any) {
  const { columns, rows, setOpen, onClickDelete, setValues, setIsEdit, user } =
    props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
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
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell>
                {row.role.charAt(0).toUpperCase() + row.role.slice(1)}
              </TableCell>
              <TableCell>{row.email}</TableCell>
              {user?.user?._id !== row._id && (
                <>
                  <TableCell>
                    <DeleteForever onClick={() => onClickDelete(row._id)} />
                  </TableCell>
                  <TableCell>
                    <Edit
                      onClick={() => {
                        setOpen(true);
                        setIsEdit(true);
                        setValues(row);
                      }}
                    />
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
