import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function MySnackBar({open, message, errorType}) {
  console.log(open, message, errorType, "dddddddddddddddddddd")
  return (
    <div>
        <Snackbar
        open={open}
        autoHideDuration={6000}
        // onClose={handleClose}
        // message={message}
        // action={action}
      >
           <Alert severity={errorType} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default MySnackBar