import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getOrganizations } from '../api/organizations';
import { Box, Card, Typography, CardContent } from '@mui/material';
import Main from '../components/common/Main';
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
function OrganizationPage(props: { data: Data; hasError: boolean }) {
  const router = useRouter();
  const onClickProduct = (d: any) => {
    router.push(`/product/${d._id}`);
  };
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <Main>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={'8px'}
        mt={'32px'}
      >
        <Card style={{ textAlign: 'center', width: '725px', height: '150px' }}>
          <CardContent>
            <Typography variant='h2'>
              Organization Name: {props.data.name}
            </Typography>
            <Typography variant='h2'>GSTIN: {props.data.gstin}</Typography>
            <Typography variant='h2'>
              Location: {props.data.location}
            </Typography>
          </CardContent>
        </Card>
        <Typography
          variant='h2'
          mt={'32px'}
        >{`Organization's Products`}</Typography>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'row'}
          gap={'16px'}
        >
          {props.data.products?.length > 0 &&
            props.data.products?.map((d: any) => (
              <Box
                key={d.name}
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              >
                <Card
                  style={{
                    textAlign: 'center',
                    width: 'fit-content',
                    height: '175px',
                  }}
                  onClick={() => onClickProduct(d)}
                >
                  <CardContent>
                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      flexDirection={'column'}
                      gap={'16px'}
                    >
                      <Typography
                        variant='h3'
                        style={{ textDecorationLine: 'underline' }}
                        key={d.name}
                      >
                        {d.name}
                      </Typography>
                      <Typography
                        variant='h3'
                        style={{ textDecorationLine: 'underline' }}
                        key={d.price}
                      >
                        INR {d.price}
                      </Typography>
                      <Typography
                        variant='h3'
                        style={{ textDecorationLine: 'underline' }}
                        key={d.stock}
                      >
                        {d.stock} pcs
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
        </Box>
      </Box>
    </Main>
  );
}

export default OrganizationPage;
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
