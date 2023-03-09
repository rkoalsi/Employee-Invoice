import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      gap={'16px'}
    >
      <Typography variant='h2'>404 - Page Not Found</Typography>
      <Typography
        variant='h3'
        style={{ textDecorationLine: 'underline' }}
        onClick={() => router.push('/')}
      >
        Go Home
      </Typography>
    </Box>
  );
}
