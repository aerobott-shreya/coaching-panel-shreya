import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditorCms = ({ value, onChange }) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      style={{ height: "200px", marginBottom: "50px" }}
    />
  );
};

export default EditorCms;