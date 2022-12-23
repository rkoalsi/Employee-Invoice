import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright(props: any) {
  return (
    <Typography variant='body2' color='white' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://google.com/'>
        Employee Invoice
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
