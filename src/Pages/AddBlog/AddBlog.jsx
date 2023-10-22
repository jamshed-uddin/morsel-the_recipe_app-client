import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";

import { Link } from "react-router-dom";

const AddBlog = () => {
  const [value, setValue] = useState(null);
  const editorRef = useRef(null);
  const [cursorIndex, setCursorIndex] = useState(0);
  console.log(value);
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link"],

    [{ align: [] }],
  ];

  // function to get editor cursor index/position and it used in inserEmbed to insert image.
  const handleSelection = (range) => {
    if (range) {
      // console.log(range);
      setCursorIndex(range.index);
    }
  };
  //   const wrapperRef = useCallback((wrapper) => {
  //     if (wrapper == null) return;

  //     wrapper.innerHTML = "";
  //     const editor = document.createElement("div");
  //     wrapper.append(editor);
  //     const newQuill = new Quill(editor, { theme: "snow" });
  //     setQuill(newQuill);
  //   }, []);
  const handleChange = (html) => {
    setValue(html);
  };

  useEffect(() => {
    const insertImage = (url) => {
      console.log("insimg", cursorIndex);
      const editor = editorRef.current.getEditor();
      console.log(url);
      editor.insertEmbed(cursorIndex, "image", url);
    };

    const toolbar = document.querySelector(".ql-toolbar");
    const formatSpan = document.createElement("span");
    formatSpan.classList.add("ql-formats");

    // label
    const imageLabel = document.createElement("label");
    imageLabel.setAttribute(`for`, "imageInput");
    imageLabel.innerText += "img";
    // input(file)
    const imageInput = document.createElement("input");
    imageInput.setAttribute("type", "file");
    imageInput.setAttribute("id", "imageInput");
    imageInput.setAttribute("accept", "image/*");
    imageInput.style.display = "none";
    imageInput.addEventListener("change", (e) => {
      const files = e.target.files;
      if (files) {
        // const url = URL.createObjectURL(file);
        const imageURL = Array.from(files).map((file) =>
          URL.createObjectURL(file)
        );
        insertImage(imageURL[0]);
      }
    });

    formatSpan.append(imageLabel);
    formatSpan.append(imageInput);
    toolbar.append(formatSpan);

    return () => {
      if (formatSpan && formatSpan.parentNode) {
        formatSpan.parentNode.removeChild(formatSpan);
      }
    };
  }, [cursorIndex]);

  //   // This is called when the "Insert Image" dialog is used
  //   const editor = editorRef.current.getEditor();
  //   const range = editorRef.current.getEditor().getSelection();
  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();
  //   input.onchange = () => {
  //     const file = input.files[0];
  //     if (file) {
  //       console.log(file);
  //       const url = URL.createObjectURL(file);

  //       if (range) {
  //         editor.insertEmbed(range.index, "image", url, Quill.sources.USER);
  //       }
  //     }
  //   };
  // };

  const handleSave = () => {
    const editor = editorRef.current.getEditor();

    localStorage.setItem("body", value);
  };

  return (
    <div className="my-container my-11">
      <div className="      lg:w-4/5 md:w-11/12 mx-auto md:shadow-xl md:rounded-xl h-full py-10 px-5 relative">
        <ReactQuill
          ref={editorRef}
          theme="snow"
          value={value}
          modules={{ toolbar: toolbarOptions }}
          onChange={handleChange}
          onChangeSelection={handleSelection}
        ></ReactQuill>

        <button onClick={handleSave}>Save</button>
        <Link to={"/blogBody"}> see blog</Link>
      </div>
    </div>
  );
};

export default AddBlog;
