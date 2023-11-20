import * as React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlogPublishModal = ({ modalOpen, setModalOpen, state, dispatch }) => {
  const [blogBodyimages, setBlogBodyImages] = React.useState([]);
  const [tagInputValue, setTagInputValue] = React.useState("");
  console.log(state);
  console.log(blogBodyimages);
  React.useEffect(() => {
    const domParser = new DOMParser();
    const htmlDoc = domParser.parseFromString(state.blogBody, "text/html");

    console.log(htmlDoc);

    const imgElements = htmlDoc.querySelectorAll("img");
    const bodyImages = Array.from(imgElements).map((element) => element.src);

    setBlogBodyImages(bodyImages);
  }, [state.blogBody]);

  // functions for tags
  const addTags = () => {
    const newTags = tagInputValue.split(",").map((tag) => tag.trim());
    const filteredTags = newTags.filter((tag) => tag !== "");

    if (filteredTags.length > 0) {
      dispatch({ type: "TAGS", name: "tags", value: filteredTags });
      setTagInputValue("");
    }
  };

  const handleClose = () => {
    setModalOpen((prevState) => !prevState);
  };

  return (
    <div>
      <Dialog
        PaperProps={{ style: { backgroundColor: "#fdfbf8" } }}
        fullScreen
        open={modalOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div className=" pr-8 mt-6 text-end">
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className=" h-screen">
          <div className="lg:flex w-4/5 mx-auto  h-full items-center ">
            <div className="lg:w-1/2 px-10 space-y-3">
              <div className="">
                <h3 className="text-lg font-semibold mb-1">Preview image</h3>
                <div
                  className={`w-full h-52 p-2 rounded-lg bg-[#f4f3f3] ${
                    !blogBodyimages.length && "flex items-center justify-center"
                  }`}
                >
                  {blogBodyimages.length ? (
                    <div className="flex gap-2 flex-wrap">
                      {blogBodyimages.map((image, index) => (
                        <img
                          className={`w-24 h-24 object-cover rounded-lg ${
                            image === state.previewImage
                              ? "border-2 border-colorOne"
                              : "border-2 border-transparent"
                          }`}
                          key={index}
                          src={image}
                          alt=""
                          name="previewImage"
                          onClick={(e) =>
                            dispatch({
                              type: "BLOG_TITLE",
                              name: e.target.name,
                              value: e.target.src,
                            })
                          }
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm px-16 text-center">
                      Add a high quality image for the preview and to make it
                      more inviting to readers.
                    </p>
                  )}
                </div>
              </div>
              <div className="">
                <input
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
              <div>
                <h4 className=" lg:pb-1">
                  Add or change tags so readers know what your story is about
                </h4>
                <div className="flex flex-wrap gap-2">
                  {state.tags.map((tag, index) => (
                    <div
                      className="flex gap-1 border-[1.3px] border-colorTwo pl-2  rounded-lg"
                      key={index}
                    >
                      <p className="">{tag}</p>

                      {/* remove tag btn */}
                      <button
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FIELD",
                            name: "tags",
                            index,
                          })
                        }
                      >
                        <CloseOutlinedIcon />
                      </button>
                    </div>
                  ))}
                </div>
                <div>
                  <input
                    className=""
                    type="text"
                    name="tags"
                    value={tagInputValue}
                    placeholder="e.g., italian,appetizer,quick,easy"
                    id="tags"
                    onChange={(e) => setTagInputValue(e.target.value)}
                  />
                  <button
                    onClick={addTags}
                    className="text-white text-lg font-semibold px-3 py-1 bg-colorOne hover:bg-opacity-80  rounded-xl mt-2"
                  >
                    + Add tag
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 px-10 lg:mt-0 mt-5 ">
              <h3 className="text-xl font-semibold">
                <span className="text-base">Story by: </span>
                {state?.creatorInfo?.creatorName}
              </h3>
              <button
                className={`text-white text-lg font-semibold px-4 py-1 bg-colorOne hover:bg-opacity-80  rounded-xl mt-3 ${
                  !state.blogBody || (!state.title && "opacity-50 ")
                }`}
              >
                Create
              </button>
              <button
                onClick={handleClose}
                className={`text-colorOne border-2 border-colorOne text-lg font-semibold px-3 ml-4 py-[0.1rem] b rounded-xl mt-3 `}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default BlogPublishModal;

/*
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MyEditor = () => {
  const modules = {
    // configure modules as needed
    // ...
  };

  const formats = [
    // configure formats as needed
    // ...
  ];

  // State to store the editor content
  const [editorContent, setEditorContent] = React.useState('');

  // Function to handle changes in the editor content
  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  // Function to extract img tags from HTML content
  const extractImages = () => {
    const doc = new DOMParser().parseFromString(editorContent, 'text/html');
    const images = doc.querySelectorAll('img');

    // Do something with the img elements
    images.forEach((img) => {
      console.log(img.src);
    });
  };

  return (
    <div>
      <ReactQuill
        value={editorContent}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
      />
      <button onClick={extractImages}>Extract Images</button>
    </div>
  );
};

export default MyEditor;

*/
