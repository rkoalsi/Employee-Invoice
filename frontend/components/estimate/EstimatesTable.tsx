import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DeleteForever, Edit } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { createSalesOrder, updateSalesOrder } from '../../api/salesOrder';
import { updateEstimate } from '../../api/estimate';
import { createInvoice } from '../../api/invoice';
import { useRouter } from 'next/router';

export default function EstimatesTable(props: any) {
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
  const router = useRouter();

  const onClickInvoice = (d: any) => {
    router.push(`/invoice/${d.organizationId}/${d.invoice}`);
  };
  const onClickSalesOrder = (d: any) => {
    router.push(`/sales-order/${d.organizationId}/${d.salesOrder}`);
  };

  const createSO = async (row: any) => {
    var rowC = { ...row };
    delete rowC['_id'];
    const res = await createSalesOrder({ ...rowC, estimate: row._id });
    await updateEstimate({ _id: row._id, salesOrder: res.data._id });
    console.log(res.data);
    if (res.status == 200) {
      setShow(true);
      setMessage('Successfully Created Sales Order');
    }
  };

  const createInv = async (row: any) => {
    try {
      if (row.salesOrder) {
        var rowC = { ...row };
        delete rowC['_id'];
        const res = await createInvoice({
          ...rowC,
          estimate: row._id,
          salesOrder: row.salesOrder,
        });
        await updateEstimate({ _id: row._id, invoice: res.data._id });
        await updateSalesOrder({ _id: row.salesOrder, invoice: res.data._id });
        if (res.status == 200) {
          setShow(true);
          setMessage('Successfully Created Invoice');
        }
        if (res.data.errors) {
          setShow(true);
          setMessage(`Error Creating Invoice`);
        }
      } else {
        setShow(true);
        setMessage(`Create Sales Order First`);
      }
    } catch (error) {
      setShow(true);
      setMessage('Error Creating Invoice`');
    }
  };
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
              <>
                <TableCell key={c}>{c}</TableCell>
              </>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row: any, i: number) => (
            <TableRow
              key={`${row.customer}${row.created_at}${i} `}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                EST-{row._id.slice(-3).toUpperCase()}
              </TableCell>
              <TableCell component='th' scope='row'>
                {row?.customer?.name}
              </TableCell>
              {/* {row.products.map((p: any) => (
                <Box key={p.product._id}>
                  <TableCell>{p.product.name}</TableCell>
                  <TableCell>{p.amount}</TableCell>
                </Box>
              ))} */}

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
              <TableCell>
                {!row.salesOrder ? (
                  <Button onClick={() => createSO(row)}>
                    Create Sales Order
                  </Button>
                ) : (
                  <Button
                    sx={{
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    }}
                    onClick={() => onClickSalesOrder(row)}
                  >
                    SO-{row.salesOrder.slice(-3).toUpperCase()}
                  </Button>
                )}
              </TableCell>
              <TableCell>
                {!row.invoice ? (
                  <Button onClick={() => createInv(row)}>Create Invoice</Button>
                ) : (
                  <Button
                    sx={{
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    }}
                    onClick={() => onClickInvoice(row)}
                  >
                    INV-{row.invoice.slice(-3).toUpperCase()}
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
