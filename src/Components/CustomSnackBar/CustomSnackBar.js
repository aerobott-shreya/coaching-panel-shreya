

import React, { useState, useEffect } from "react";

import Stack from "@mui/material/Stack";

import Button from "@mui/material/Button";

import Snackbar from "@mui/material/Snackbar";

import MuiAlert from "@mui/material/Alert";




const Alert = React.forwardRef(function Alert(props, ref) {

  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;

});




function CustomSnackBar({ message, openSnack, severity, ...props }) {






  const [open, setOpen] = React.useState(false);

  useEffect(() => {

    if (openSnack) {

      setOpen(true);

    }

    const myTimeout = setTimeout(handleOpen, 3000);

    function handleOpen() {

      setOpen(false);

    }

  }, [openSnack]);




  const handleClick = () => {

    setOpen(true);

  };




  const handleClose = (event, reason) => {

    if (reason === "clickaway") {

      return;

    }

    setOpen(false);

  };




  return (

    <Stack spacing={2} sx={{ width: "100%" }}>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>

        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>

          {message}

        </Alert>

      </Snackbar>

    </Stack>

  );

}




export default CustomSnackBar;


