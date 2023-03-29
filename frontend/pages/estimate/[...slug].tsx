import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { getEstimates } from '../../api/estimate';
import { SalesOrderData } from '../../types';

function EstimatePage(props: { data: SalesOrderData; hasError: boolean }) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1 color='white'>Loading...</h1>;
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
      <Typography variant='h2'>Estimate ID: {props.data._id}</Typography>
      <Typography variant='h2'>
        Customer Name: {props.data.customer.name}
      </Typography>
      <Typography variant='h2'>
        Customer Shop Name: {props.data.customer.shop}
      </Typography>
      <Typography variant='h2'>
        Estimate Total: {props.data.total} INR (GST Exclusive)
      </Typography>
      <br />
      <br />
      <Typography variant='h2'>Products</Typography>
      {props.data.products.map((p) => (
        <Typography variant='h3' key={p.product._id}>
          {p.product.name} {`\t`} - {p.amount} pcs
        </Typography>
      ))}
    </Box>
  );
}

export default EstimatePage;
async function getData(id: any) {
  const res = await getEstimates(id);
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
