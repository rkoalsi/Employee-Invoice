import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { getSalesOrders } from '../../api/salesOrder';
import { InvoiceData } from '../../types';

function SalesOrderPage(props: { data: InvoiceData; hasError: boolean }) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <Box
      display={'flex'}
      mt={'20px'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      gap={'8px'}
    >
      <Typography variant='h2'>Sales Order ID: {props.data._id}</Typography>
      <Typography variant='h2'>
        Customer Name: {props.data.customer.name}
      </Typography>
      <Typography variant='h2'>
        Customer Shop Name: {props.data.customer.shop}
      </Typography>
      <Typography variant='h2'>
        Invoice Total: {props.data.total} INR (GST Exclusive)
      </Typography>
      <br />
      <br />
      <Typography variant='h2'>Products</Typography>
      {props.data.products.map((p) => (
        <Typography variant='h3'>
          {p.product.name} {`\t`} - {p.amount} pcs
        </Typography>
      ))}
    </Box>
  );
}

export default SalesOrderPage;
async function getData(id: string) {
  const res = await getSalesOrders(id);
  return res.data;
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async (context: any) => {
  const arr = context.params?.slug;
  const dat = await getData(arr[0]);
  var data = dat.find((d: any) => d._id === arr[1]);
  if (!data) {
    return {
      props: { hasError: true },
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
};
