import axios from "axios";
import "quill/dist/quill.snow.css";
import { useEffect, useReducer, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "./AddBlog.css";

import BlogPublishModal from "./BlogPublishModal";

const initialState = {
  title: "",
  previewImage: "",
  creatorInfo: {
    creatorName: "Uweuewueueeu Osas",
    creatorId: "",
    creatorEmail: "",
    creatorPhoto: "",
  },
  blogBody: "",
  status: "pending",
  likedBy: [],
  tags: [],
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
    case "REMOVE_FIELD":
      return {
        ...state,
        [action.name]: state[action.name].filter(
          (_, index) => index !== action.index
        ),
      };

    case "TAGS":
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
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [modalOpen, setModalOpen] = useState(false);
  console.log(value);

  // console.log(state);
  // const editor = editorRef.current?.getEditor();
  // const delta = editor.getContents();
  // console.log(delta);

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

  //editor value onchange function
  const handleChange = (html) => {
    setValue(html);
    dispatch({ type: "BLOG_BODY", name: "blogBody", value: html });
  };

  //function for opening publishing modal
  const handlePublishModalOpen = () => {
    setModalOpen((prevState) => !prevState);
  };

  // function for showing alert before user reload or goes back while changes made in form.
  useEffect(() => {
    if (state.title.length === 0 && state.blogBody.length === 0) {
      return;
    }
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      const confirmationMessage = "Are you sure you want to reload this page?";
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [state.title, state.blogBody]);

  useEffect(() => {
    const insertImage = (file) => {
      const editor = editorRef.current.getEditor();
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = async (e) => {
        const imageUrl = e.target.result;
        console.log(imageUrl);
        editor.insertEmbed(cursorIndex, "image", imageUrl);
        editor.insertText(cursorIndex + 1, "\n", "user");

        if (file) {
          const imageData = new FormData();
          imageData.append("file", file);
          imageData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
          setLoading(true);
          axios
            .post(
              `https://api.cloudinary.com/v1_1/${
                import.meta.env.VITE_CLOUD_NAME
              }/image/upload`,
              imageData
            )
            .then((response) => {
              if (response) {
                const cloudImageUrl = response.data.secure_url;
                const imgElement =
                  editor.container.querySelectorAll(`img[src]`);
                imgElement.forEach((element) => {
                  if (element.src === imageUrl) {
                    element.src = cloudImageUrl;
                  }
                });
              }

              setLoading(false);
            })
            .catch((error) => console.log(error));
        }
      };
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
      insertImage(files[0]);
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

  return (
    <div className="my-container my-11">
      <div className=" text-colorTwo  lg:w-4/5 md:w-11/12 mx-auto md:shadow-xl md:rounded-xl h-full py-2 px-5 relative">
        <div className="flex justify-between items-center sticky top-0 bg-bgColor z-20 mb-2 px-1">
          <h4 className="md:text-3xl text-2xl font-bold text-colorOne">
            Add Blog
          </h4>
          {loading && (
            <p>
              <span className="animate-ping relative inline-flex rounded-full h-3 w-3 bg-colorOne"></span>
            </p>
          )}
          <button
            disabled={state.blogBody.length < 20}
            type="submit"
            className={`text-white text-lg font-semibold px-3 py-1 bg-colorOne hover:bg-opacity-80  rounded-xl mt-3 ${
              state.blogBody.length < 20 && "opacity-50 "
            }`}
            onClick={handlePublishModalOpen}
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
            value={state.title}
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
      </div>
      <BlogPublishModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        state={state}
        dispatch={dispatch}
      ></BlogPublishModal>
    </div>
  );
};

export default AddBlog;