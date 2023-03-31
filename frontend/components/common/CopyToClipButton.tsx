import { CopyAllOutlined } from '@mui/icons-material';
import { Button, Snackbar } from '@mui/material';
import { useState } from 'react';

const CopyToClipboardButton = (props: { text: string; clickText: string }) => {
  const [open, setOpen] = useState(false);
  const handleClick = (str: string) => {
    setOpen(true);
    navigator.clipboard.writeText(str);
  };

  return (
    <>
      <Button onClick={() => handleClick(props.clickText)}>
        <CopyAllOutlined />
      </Button>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message={`${props.text} Successfully Copied To Clipboard`}
      />
    </>
  );
};

export default CopyToClipboardButton;
