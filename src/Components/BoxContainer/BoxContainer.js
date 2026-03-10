import { Paper } from '@mui/material';
import React from 'react'
import styles from './index.module.css';

function BoxContainer({children}) {
  return (
    <Paper elevation={3} >
        {children}
    </Paper>
  )
}

export default BoxContainer