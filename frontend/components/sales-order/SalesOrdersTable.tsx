import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DeleteForever, Edit } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { updateSalesOrder } from '../../api/salesOrder';
import { createInvoice } from '../../api/invoice';
import { createEstimate } from '../../api/estimate';

export default function SalesOrdersTable(props: any) {
  const {
    columns,
    rows,
    setOpen,
    setValues,
    setIsEdit,
    deleteData,
    setMessage,
    setShow,
  } = props;
  const createEst = async (row: any) => {
    var rowC = { ...row };
    delete rowC['_id'];
    const res = await createEstimate({ ...rowC, estimate: row._id });
    await updateSalesOrder({ _id: row._id, estimate: res.data._id });
    console.log(res.data);
    if (res.status == 200) {
      setShow(true);
      setMessage('Successfully Created Sales Order');
    }
  };
  const createInv = async (row: any) => {
    try {
      var rowC = { ...row };
      delete rowC['_id'];
      const res = await createInvoice({
        ...rowC,
        estimate: row.estimate,
        salesOrder: row._id,
      });
      await updateSalesOrder({ _id: row._id, invoice: res.data._id });
      if (res.status == 200) {
        setShow(true);
        setMessage('Successfully Created Invoice');
      }
      if (res.data.errors) {
        setShow(true);
        setMessage(`Error Creating Invoice`);
      }
    } catch (error) {
      setShow(true);
      setMessage('Error Creating Invoice`');
    }
  };
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
                {!row.estimate ? (
                  <Button onClick={() => createEst(row)}>
                    Create Estimate
                  </Button>
                ) : (
                  <Typography>{row.estimate}</Typography>
                )}
              </TableCell>
              <TableCell>
                {!row.invoice ? (
                  <Button onClick={() => createInv(row)}>Create Invoice</Button>
                ) : (
                  <Typography>{row.invoice}</Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
