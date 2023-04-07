import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import styled from 'styled-components';
import { Button, Box } from '@mui/material';

export default function BDrawer(props: any) {
  const {
    open,
    setOpen,
    setValues,
    setIsEdit,
    values,
    onClickSubmit,
    buttonText,
    onClickCancel,
  } = props;
  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };
  return (
    <Container style={{ marginTop: '50px' }}>
      <React.Fragment key={'right'}>
        <Button
          onClick={() => {
            toggleDrawer(true);
            setIsEdit(false);
            setValues(values);
          }}
        >
          {buttonText}
        </Button>
        <Drawer
          anchor={'right'}
          open={open}
          onClose={() => toggleDrawer(false)}
        >
          {props.children}
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={'16px'}
          >
            <Button
              variant={'contained'}
              color={'error'}
              onClick={() => {
                toggleDrawer(false);
                setIsEdit(false);
                setValues(values);
                onClickCancel();
              }}
            >
              Cancel
            </Button>
            <Button
              variant={'contained'}
              onClick={() => {
                toggleDrawer(false);
                onClickSubmit();
                onClickCancel();
              }}
            >
              Submit
            </Button>
          </Box>
        </Drawer>
      </React.Fragment>
    </Container>
  );
}

const Container = styled.div`
  padding: 8px;
  position: absolute;
  top: 0;
  right: 0;
`;
