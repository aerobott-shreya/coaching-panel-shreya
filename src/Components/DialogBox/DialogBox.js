import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import IconButton from '@mui/material/IconButton';

function DialogBox({ open, onClose=()=>{}, title, children, dataSend=() => {}, display=true, ...props}) {
  console.log(open, "oooooo")
  return (
    <div>
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            {display && <DialogActions>
              <IconButton onClick={onClose}>
                <Button >Cancel</Button>
                </IconButton>
                
                <IconButton onClick={dataSend}>
                <Button >ok</Button>
                </IconButton>
            </DialogActions>}
        </Dialog>
    </div>
  )
}

export default DialogBox