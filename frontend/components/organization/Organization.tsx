import React from 'react';
import { useUserContext } from '../../context/user';
import { Box, Button, IconButton } from '@mui/material';
import CopyToClipboardButton from '../common/CopyToClipButton';

interface Props {}

function Organization(props: Props) {
  const [user, setUser] = useUserContext();
  return (
    <Box
      component='span'
      m={8}
      display='flex'
      justifyContent='center'
      alignItems='center'
      gap={'16px'}
      borderRadius={'16px'}
      border={'1px solid black'}
    >
      Organization Id = {user?.user?.organizationId}
      <CopyToClipboardButton
        text={'Organization Id'}
        clickText={user?.user?.organizationId}
      />
    </Box>
  );
}

export default Organization;
