import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function CustomCircularProgress({ value, ...props }) {
    return (
        <>
            <CircularProgress variant="determinate" value={value} thickness={8} size={50} />
        </>
    )
}

export default CustomCircularProgress;