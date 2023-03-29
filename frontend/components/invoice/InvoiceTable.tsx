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
  MarkEmailRead,
  MarkEmailUnread,
} from '@mui/icons-material';
import { sendInvoiceEmail, updateInvoice } from '../../api/invoice';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { createSalesOrder, updateSalesOrder } from '../../api/salesOrder';
import { createEstimate } from '../../api/estimate';
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
  const router = useRouter();

  const onClickEstimate = (d: any) => {
    router.push(`/estimate/${d.organizationId}/${d.estimate}`);
  };
  const onClickSalesOrder = (d: any) => {
    router.push(`/sales-order/${d.organizationId}/${d.salesOrder}`);
  };
  const createSO = async (row: any) => {
    var rowC = { ...row };
    delete rowC['_id'];
    const res = await createSalesOrder({ ...rowC, invoice: row._id });
    await updateInvoice({ _id: row._id, salesOrder: res.data._id });
    if (res.status == 200) {
      setShow(true);
      setMessage('Successfully Created Sales Order');
    }
  };

  const createEst = async (row: any) => {
    try {
      if (row.salesOrder) {
        var rowC = { ...row };
        delete rowC['_id'];
        const res = await createEstimate({
          ...rowC,
          invoice: row._id,
          salesOrder: row.salesOrder,
        });
        await updateInvoice({ _id: row._id, estimate: res.data._id });
        await updateSalesOrder({ _id: row.salesOrder, estimate: res.data._id });
        if (res.status == 200) {
          setShow(true);
          setMessage('Successfully Created Estimate');
        }
        if (res.data.errors) {
          setShow(true);
          setMessage(`Error Creating Estimate`);
        }
      } else {
        setShow(true);
        setMessage(`Create Sales Order First`);
      }
    } catch (error) {
      setShow(true);
      setMessage('Error Creating Estimate`');
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
          {rows?.map((row: any) => (
            <TableRow
              key={`${row.customer}${row.created_at} `}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                INV-{row._id.slice(-3).toUpperCase()}
              </TableCell>
              <TableCell component='th' scope='row'>
                {row?.customer?.name}
              </TableCell>
              {/* {row.products.map((p: any) => (
                <TableRow key={p.product.name}>
                  <TableCell>{p.product.name}</TableCell>
                  <TableCell>{p.amount}</TableCell>
                </TableRow>
              ))} */}

              <TableCell>INR {row.total}</TableCell>
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
                  <Button onClick={() => createSO(row)}>
                    Create Sales Order
                  </Button>
                ) : (
                  <Button
                    onClick={() => onClickSalesOrder(row)}
                    sx={{
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    }}
                  >
                    SO-{row.salesOrder.slice(-3).toUpperCase()}
                  </Button>
                )}
              </TableCell>
              <TableCell>
                {!row.estimate ? (
                  <Button onClick={() => createEst(row)}>
                    Create Estimate
                  </Button>
                ) : (
                  <Button
                    onClick={() => onClickEstimate(row)}
                    sx={{
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    }}
                  >
                    EST-{row.estimate.slice(-3).toUpperCase()}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
