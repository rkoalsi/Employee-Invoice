import Head from 'next/head';
import Customers from '../../components/customer/Customers';
import Main from '../../components/common/Main';
export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Main>
        <Customers />
      </Main>
    </>
  );
}
