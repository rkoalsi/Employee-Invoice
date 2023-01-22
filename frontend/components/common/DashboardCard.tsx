import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Icon } from '@mui/material';

export default function DashCard(props: any) {
  return (
    <Card sx={{ width: '275px', boxShadow: '8px' }}>
      <CardContent>
        <Icon>{props.icon}</Icon>
        <Typography variant='h5'>{props.text}</Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={() => props.onClick()}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
