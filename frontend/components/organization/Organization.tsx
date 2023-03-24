import React from 'react';
import { useUserContext } from '../../context/user';
import { Box, Button, IconButton } from '@mui/material';
import CopyToClipboardButton from '../common/CopyToClipButton';
import { useRouter } from 'next/router';

interface Props {}

function Organization(props: Props) {
  const router = useRouter();
  const [user, setUser] = useUserContext();
  return (
    <Box
      m={8}
      display='flex'
      justifyContent='center'
      alignItems='center'
      gap={'16px'}
      borderRadius={'16px'}
      flexDirection={'column'}
    >
      <Box
        component='span'
        m={3}
        display='flex'
        justifyContent='center'
        alignItems='center'
        gap={'16px'}
        borderRadius={'16px'}
        p={2}
        border={'1px solid black'}
      >
        Organization Id = {user?.user?.organizationId}
        <CopyToClipboardButton
          text={'Organization Id'}
          clickText={user?.user?.organizationId}
        />
      </Box>
      <Button onClick={() => router.push(`/${user?.user?.organizationId}`)}>
        Go to Organization's Page
      </Button>
    </Box>
  );
}

export default Organization;
