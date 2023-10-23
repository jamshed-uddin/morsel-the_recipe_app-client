import axios from "axios";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";

import { Link } from "react-router-dom";

const AddBlog = () => {
  const [value, setValue] = useState(null);
  const editorRef = useRef(null);
  const [cursorIndex, setCursorIndex] = useState(0);
  // console.log(value);
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],

    ["link"],
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
      const editor = editorRef.current.getEditor();
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
        console.log(files);
        // const url = URL.createObjectURL(files[0]);
        const imageData = new FormData();
        imageData.append("file", files[0]);
        imageData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        axios
          .post(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_CLOUD_NAME
            }/image/upload`,
            imageData
          )
          .then((response) => {
            if (response) {
              const imageUrl = response.data.secure_url;
              insertImage(imageUrl);
            }
            console.log(response);
          })
          .catch((error) => console.log(error));
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

  const sanitizeLink = (url) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      const newUrl = "https://" + url;
      return newUrl;
    } else {
      return url;
    }
  };
  useEffect(() => {
    const editor = editorRef.current.getEditor();

    // console.log(cursorIndex);

    editor.on("text-change", (delta, oldDelta, source) => {
      console.log(delta);
      console.log(oldDelta.ops);
      if (source === "user") {
        const currentContents = editor.getContents();
        const operations = currentContents.ops;
        console.log(operations);
        // console.log(delta);

        const updatedDelta = operations.map((op, index) => {
          console.log(op, "index", index);
          if (op.attributes && op.attributes.link) {
            const editorCursorIndex = currentContents.ops.indexOf(op);
            console.log("editor", editorCursorIndex);
            if (editorCursorIndex === index) {
              const linkURL = op.attributes.link;

              const validLinkURL = sanitizeLink(linkURL);
              console.log(linkURL);
              return {
                ...op,
                attributes: {
                  ...op.attributes,
                  link: validLinkURL,
                },
              };
            }

            // editor.insertEmbed(cursorIndex, "link", validLinkURL);
          } else return op;
        });

        console.log([...updatedDelta, { insert: "\n" }]);
        editor.setContents([...updatedDelta, { insert: "\n" }], "api");
      }
    });
  }, []);

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
