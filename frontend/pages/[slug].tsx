import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getOrganizations } from '../api/organizations';
import { Box, Typography } from '@mui/material';
interface Data {
  _id: string;
  name: string;
  gstin: string;
  location: string;
  created_at: string;
  updated_at: string;
  __v: number;
  products: [];
}
function projectPage(props: { data: Data; hasError: boolean }) {
  const router = useRouter();
  const onClickProduct = (d: any) => {
    router.push(`/product/${d._id}`);
  };
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      gap={'8px'}
    >
      <Typography variant='h2'>Organization Name: {props.data.name}</Typography>
      <Typography variant='h2'>GSTIN: {props.data.gstin}</Typography>
      <Typography variant='h2'>Location: {props.data.location}</Typography>
      {props.data.products?.length > 0 &&
        props.data.products?.map((d: any) => (
          <Box
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            <Typography
              variant='h3'
              style={{ textDecorationLine: 'underline' }}
              key={d.name}
              onClick={() => onClickProduct(d)}
            >
              {d.name}
            </Typography>
          </Box>
        ))}
    </Box>
  );
}

export default projectPage;
async function getData() {
  const res = await getOrganizations();
  return res.data;
}
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getData();
  const pathsWithParams = data.map((d: Data) => ({
    params: { slug: d._id },
  }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const itemID = context.params?.slug;
  const data = await getData();
  const foundItem = data.find((item: Data) => itemID === item._id);

  if (!foundItem) {
    return {
      props: { hasError: true },
      notFound: true,
    };
  }

  return {
    props: {
      data: foundItem,
    },
  };
};
