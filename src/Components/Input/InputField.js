import { TextField } from '@mui/material';
import React from 'react'

function InputField(props) {
  const { value, label, name, placeholder, type, onChange, error = false, multiline=false, width="auto", rows = 0, size = "small", style = {} } = props;
  return (
    <TextField
      id="outlined-basic"
      label={label}
      value={value}
      name={name}
      size={size}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      variant="outlined"
      error={error}
      style={style}
      multiline={multiline}
      rows={rows}
      // width={width}
      sx={{
        width: width
      }}
    />
  )
}

export default InputField;