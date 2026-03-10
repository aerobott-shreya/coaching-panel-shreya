<<<<<<< HEAD
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function EditorCms({ onChange = () => { }, height, question}) {

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    // const handleChange = (content, editor) => {
    //     if (typeof (onChange) === "function") {
    //         onChange(content, editor)
    //     }

    // }

    return (
        <div>
            <Editor
                // apiKey='af5g2vjc39lxabpz21okddqupkttm88ldzkbh764wohi57fu'
                apiKey='lq0ua1cpmslv3jcs259x3durcyfm3q6qnb6bdcs2vhro0g1r'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={question}
                onEditorChange={onChange}
                init={{
                    height: height,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
        </div>
    )
}

export default EditorCms
=======
import React, { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditorCms({ onChange = () => {}, height = 300, question = "" }) {

  const modules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  }), []);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div style={{ marginBottom: "50px" }}>
      <ReactQuill
        theme="snow"
        value={question || ""}
        onChange={onChange}
        modules={modules}
        formats={formats}
        style={{ height: height }}
      />
    </div>
  );
}

export default EditorCms;
>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)
