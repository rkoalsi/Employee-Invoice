import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { login } from '../../api/auth';
import Router from 'next/router';
import Toast from '../common/Toast';
import Copyright from '../common/Copyright';
import Input from '../common/Input';
import { useUserContext } from '../../context/user';
import { SIGNIN_VERIFICATION_SCHEMA } from '../../helpers/validators';

interface Props {}

function Login(props: Props) {
  const [error, setError] = React.useState<{
    status: boolean | string;
    message: string;
  }>({ status: false, message: '' });
  const [user, setUser] = useUserContext();
  const [data, setData] = React.useState<any>({
    email: '',
    password: '',
  });
  const onClickSignin = async () => {
    try {
      const check = await SIGNIN_VERIFICATION_SCHEMA.validate(data, {
        abortEarly: false,
      });
      if (check) {
        try {
          const w = await login(data);
          if (w.data.errors) {
            setError({ status: true, message: w.data.message });
          } else {
            setError({ status: 'success', message: 'Successfully Logged In' });
            setUser(w.data);
            Router.push('/');
          }
        } catch (error: any) {
          if (error && error.response && error.response.status == 400) {
            setError({ status: true, message: error.response.data });
          } else {
            setError({ status: true, message: error.message });
          }
        }
      }
    } catch (err: any) {
      err.inner.forEach((e: any) => {
        setError({ status: true, message: e.message });
      });
    }
  };

  const onChange = (cond: string, str: string) => {
    if (cond === 'email') {
      setData({ ...data, email: str });
    }
    if (cond === 'password') {
      setData({ ...data, password: str });
    }
  };

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Toast error={error} />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5' color={'black'}>
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={onClickSignin}
            noValidate
            color={'black'}
            sx={{ mt: 1 }}
          >
            <Input
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              variant={'standard'}
              onChange={(e: any) => onChange('email', e.target.value)}
            />
            <Input
              variant={'standard'}
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={(e: any) => onChange('password', e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value='remember' />}
              label='Remember me'
            />
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={onClickSignin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/register' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}
export default Login;
