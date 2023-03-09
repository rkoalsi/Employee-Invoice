import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getProduct, getProducts } from '../../api/product';
import { Box, Typography } from '@mui/material';
interface Data {
  _id: string;
  name: string;
  sku: string;
  hsn: string;
  price: string;
  gst: string;
  stock: string;
  organizationId: string;
  createdBy: string;
  created_at: string;
  updated_at: string;
  __v: number;
}
function ProductPage(props: { data: Data; hasError: boolean }) {
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
      <Typography variant='h2'>Product ID: {props.data._id}</Typography>
      <Typography variant='h2'>Product Name: {props.data.name}</Typography>
      <Typography variant='h2'>Product Sku: {props.data.sku} </Typography>
      <Typography variant='h2'>
        Product Price: {props.data.price} INR
      </Typography>
      <Typography variant='h2'>
        Product Stock: {props.data.stock} pcs
      </Typography>
    </Box>
  );
}

export default ProductPage;
async function getData(id: any) {
  const res = await getProduct(id);
  return res.data;
}
export const getStaticPaths: GetStaticPaths = async () => {
  // const data = await getData();
  // const pathsWithParams = data.map((d: Data) => ({
  //   params: { slug: d._id },
  // }));
  return {
    paths: [],
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.slug;
  const data = await getData(id);

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
