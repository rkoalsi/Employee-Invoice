import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { login, resetPassword } from '../../api/auth';
import Router from 'next/router';
import Toast from '../common/Toast';
import Copyright from '../common/Copyright';
import Input from '../common/Input';
import { useUserContext } from '../../context/user';
import { SIGNIN_VERIFICATION_SCHEMA } from '../../helpers/validators';

interface Props {}

function ForgotPassword(props: Props) {
  const [error, setError] = React.useState<{
    status: boolean | string;
    message: string;
  }>({ status: false, message: '' });
  const [user, setUser] = useUserContext();
  const [next, setNext] = React.useState(false);
  const [data, setData] = React.useState<any>({
    email: '',
    password: '',
  });
  const onClickReset = () => setNext(true);
  const onClickSignin = async () => {
    try {
      const check = await SIGNIN_VERIFICATION_SCHEMA.validate(data, {
        abortEarly: false,
      });
      if (check) {
        const w = await resetPassword(data);
        console.log(w.data);
        if (!w.data.errors) {
          setError({
            status: 'success',
            message: 'Successfully Changed Password and Logged In',
          });
          setUser(w.data);
          Router.push('/dashboard');
        }
      }
    } catch (error: any) {
      if (error.inner) {
        error.inner.forEach((e: any) => {
          setError({ status: true, message: e.message });
        });
      }
      if (error && error.response && error.response.status == 400) {
        setError({ status: true, message: error.response.data });
      } else {
        setError({ status: true, message: error.message });
      }
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
            Forgot Password
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
            {next && (
              <Input
                variant={'standard'}
                required
                fullWidth
                name='password'
                label='New Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={(e: any) => onChange('password', e.target.value)}
              />
            )}
            <Button
              id='sign-in'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={next ? onClickSignin : onClickReset}
            >
              {next ? `Reset Password` : `Enter Password`}
            </Button>
            <Grid container>
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
export default ForgotPassword;
