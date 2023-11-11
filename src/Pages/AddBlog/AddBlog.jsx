import axios from "axios";
import "quill/dist/quill.snow.css";
import { useEffect, useReducer, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "./AddBlog.css";
import { Link } from "react-router-dom";

const initialState = {
  title: "",
  creatorName: "",
  creatorId: "",
  blogBody: "",
  status: "pending",
  likedBy: [],
  savedBy: [],
  createdAt: new Date().toString(),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "BLOG_TITLE":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "BLOG_BODY":
      return {
        ...state,
        [action.name]: action.value,
      };

    default:
      return state;
  }
};

const AddBlog = () => {
  const [value, setValue] = useState(null);
  const editorRef = useRef(null);
  const [cursorIndex, setCursorIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(value);
  console.log(state);
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, false] }],
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
    dispatch({ type: "BLOG_BODY", name: "blogBody", value: html });
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
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 512 512" id="image"><path d="M368 224c26.5 0 48-21.5 48-48s-21.5-48-48-48-48 21.5-48 48 21.5 48 48 48z"></path><path d="M452 64H60c-15.6 0-28 12.7-28 28.3v327.4c0 15.6 12.4 28.3 28 28.3h392c15.6 0 28-12.7 28-28.3V92.3c0-15.6-12.4-28.3-28-28.3zM348.9 261.7c-3-3.5-7.6-6.2-12.8-6.2-5.1 0-8.7 2.4-12.8 5.7L304.6 277c-3.9 2.8-7 4.7-11.5 4.7-4.3 0-8.2-1.6-11-4.1-1-.9-2.8-2.6-4.3-4.1L224 215.3c-4-4.6-10-7.5-16.7-7.5-6.7 0-12.9 3.3-16.8 7.8L64 368.2V107.7c1-6.8 6.3-11.7 13.1-11.7h357.7c6.9 0 12.5 5.1 12.9 12l.3 260.4-99.1-106.7z"></path></svg>`;
    imageLabel.setAttribute(`for`, "imageInput");
    imageLabel.innerHTML = svg;
    // input(file)
    imageLabel.style.cursor = "pointer";
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

  // for sanitizing the links(can't set the delta to the editor)
  // useEffect(() => {
  //   const editor = editorRef.current.getEditor();

  //   // console.log(cursorIndex);

  //   editor.on("text-change", (delta, oldDelta, source) => {
  //     // console.log(delta);
  //     console.log(oldDelta.ops);
  //     if (source === "user") {
  //       const currentContents = editor.getContents();
  //       const operations = currentContents.ops;
  //       console.log(operations);
  //       // console.log(delta);

  //       const updatedDelta = operations.map((op, index) => {
  //         console.log(op, "index", index);
  //         if (op.attributes && op.attributes.link) {
  //           const editorCursorIndex = currentContents.ops.indexOf(op);
  //           console.log("editor", editorCursorIndex);
  //           if (editorCursorIndex === index) {
  //             const linkURL = op.attributes.link;

  //             const validLinkURL = sanitizeLink(linkURL);
  //             console.log(linkURL);
  //             return {
  //               ...op,
  //               attributes: {
  //                 ...op.attributes,
  //                 link: validLinkURL,
  //               },
  //             };
  //           }

  //           // editor.insertEmbed(cursorIndex, "link", validLinkURL);
  //         } else return op;
  //       });

  //       console.log(updatedDelta);
  //       console.log(editor.getContents());
  //       const updatedOps = editor.getContents().ops;
  //       // editor.setContents(updatedDelta, "api");
  //     }
  //   });
  // }, []);

  const handleSave = () => {
    const editor = editorRef.current.getEditor();

    localStorage.setItem("body", value);
  };

  return (
    <div className="my-container my-11">
      <div className=" text-colorTwo  lg:w-4/5 md:w-11/12 mx-auto md:shadow-xl md:rounded-xl h-full py-2 px-5 relative">
        <div className="flex justify-between items-center sticky top-0 bg-bgColor z-20 mb-2 px-2">
          <h4 className="md:text-3xl text-2xl font-bold text-colorOne">
            Add Blog
          </h4>
          {loading && (
            <p>
              <span className="animate-ping relative inline-flex rounded-full h-3 w-3 bg-colorOne"></span>
            </p>
          )}
          <button
            type="submit"
            className={`text-white text-lg font-semibold px-3 py-1 bg-colorOne hover:bg-opacity-80  rounded-xl mt-3 `}
          >
            Create
          </button>
        </div>
        <div className=" relative mb-3">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            value={state.recipeName}
            onChange={(e) =>
              dispatch({
                type: "BLOG_TITLE",
                name: e.target.name,
                value: e.target.value,
              })
            }
          />
        </div>
        <ReactQuill
          ref={editorRef}
          theme="snow"
          value={value}
          modules={{ toolbar: toolbarOptions }}
          onChange={handleChange}
          onChangeSelection={handleSelection}
          placeholder="Tell your story..."
        ></ReactQuill>

        <button onClick={handleSave}>Save</button>
        <Link to={"/blogBody"}> see blog</Link>
      </div>
    </div>
  );
};

export default AddBlog;
