import React from 'react'
import Snackbar from '@mui/material/Snackbar';

function Snackbars({ open, onClose = () => { } }) {
    return (

        <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={onClose}
                message="Note archived"
            // action={action}
            />
        </div>
        
    )
}

export default Snackbars