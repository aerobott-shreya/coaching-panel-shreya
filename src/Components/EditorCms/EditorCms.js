import React from "react";
import { TextField } from "@mui/material";

const EditorCms = ({ value, onChange, label = "Enter text" }) => {
  return (
    <TextField
      fullWidth
      multiline
      rows={4}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      margin="normal"
    />
  );
};

export default EditorCms;