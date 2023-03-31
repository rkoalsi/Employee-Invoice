import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { TypographyH2 } from './Typography';

export default function Copyright(props: any) {
  return (
    <TypographyH2 variant='body2' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href=' '>
        Employee Invoice
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </TypographyH2>
  );
}
