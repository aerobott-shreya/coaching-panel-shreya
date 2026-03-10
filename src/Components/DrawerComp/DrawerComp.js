import { Drawer } from '@mui/material'
import React from 'react'

function DrawerComp({children, anchor, open, onClose = () =>{}}) {
  return (
    <div>
        <Drawer
        anchor={anchor}
        open={open}
        onClose={onClose}
        >
            {children}
        </Drawer>
    </div>
  )
}

export default DrawerComp