import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  DeleteForever,
  Edit,
  EmailOutlined,
  MarkEmailRead,
  MarkEmailReadTwoTone,
  MarkEmailUnread,
} from '@mui/icons-material';
import { sendInvoiceEmail } from '../../api/invoice';
import { Box, Button, Typography } from '@mui/material';

export default function InvoiceTable(props: any) {
  const {
    columns,
    rows,
    setOpen,
    setValues,
    setIsEdit,
    deleteData,
    setShow,
    setMessage,
  } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
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

              <TableCell>{row.total}</TableCell>
              <TableCell>{new Date(row.created_at).toTimeString()}</TableCell>
              <TableCell>
                <DeleteForever onClick={() => deleteData(row._id)} />
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
              <TableCell>
                {row.sentEmail ? (
                  <MarkEmailRead
                    onClick={() => {
                      setShow(true);
                      setMessage(
                        `Email has already been sent to ${row.customer.name}`
                      );
                    }}
                  />
                ) : (
                  <MarkEmailUnread
                    onClick={async () => {
                      await sendInvoiceEmail({
                        id: row._id,
                        email: `${row.customer.email}`,
                      });
                      setShow(true);
                      setMessage(
                        `Successfully Sent Email to ${row.customer.name}`
                      );
                    }}
                  />
                )}
              </TableCell>
              <TableCell>
                {!row.salesOrder ? (
                  <Button onClick={() => console.log(row)}>
                    Create Sales Order
                  </Button>
                ) : (
                  <Typography>{row.salesOrder}</Typography>
                )}
              </TableCell>
              <TableCell>
                {!row.estimate ? (
                  <Button onClick={() => console.log(row)}>
                    Create Invoice
                  </Button>
                ) : (
                  <Typography>{row.estimate}</Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
