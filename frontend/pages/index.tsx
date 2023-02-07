import React from 'react';
import { useUserContext } from '../context/user';
import Router from 'next/router';
import { isObjectEmpty } from '../helpers/validations';
interface Props {}

function Home(props: Props) {
  const {} = props;
  const [user, setUser] = useUserContext();
  React.useEffect(() => {
    if (isObjectEmpty(user)) {
      Router.push('/login');
    }
    if (user.token) {
      Router.push('/');
    }
  }, [user]);
  return <div>Home</div>;
}

export default Home;
