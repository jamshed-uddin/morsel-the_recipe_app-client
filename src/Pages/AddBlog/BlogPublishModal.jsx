import * as React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import MyButton from "../../Components/Button/MyButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlogPublishModal = ({
  editMode,
  modalOpen,
  setModalOpen,
  state,
  dispatch,
  currentUser,
}) => {
  const [blogBodyimages, setBlogBodyImages] = React.useState([]);
  const [tagInputValue, setTagInputValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { user } = useAuthContext();

  const navigate = useNavigate();

  // console.log(state);
  // console.log(blogBodyimages);
  React.useEffect(() => {
    const domParser = new DOMParser();
    const htmlDoc = domParser.parseFromString(state.blogBody, "text/html");

    // console.log(htmlDoc);

    const imgElements = htmlDoc.querySelectorAll("img");
    const bodyImages = Array.from(imgElements).map((element) => element.src);
    // console.log(bodyImages);
    if (bodyImages.length >= 1) {
      dispatch({
        type: "BLOG_TITLE",
        name: "previewImage",
        value: bodyImages[0],
      });
    }
    setBlogBodyImages(bodyImages);
  }, [state.blogBody, dispatch]);

  // functions for tags
  const addTagsHandler = () => {
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

  //submit/create blog handler
  const createBlogHandler = async () => {
    // passing only creator id .by this id we will get a recipe data populated creatorInfo with userInfo and using BLOG-TITLE case for that.

    setLoading(true);
    if (!editMode) {
      await axios
        .post(`${import.meta.env.VITE_BASEURL}/createBlog`, state)
        .then((result) => {
          setLoading(false);
          navigate(`/blog/detail/${result.data.id}`);
          //id here is coming from created blog.and using it to navigate to detail page after creating
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      await axios
        .put(
          `${import.meta.env.VITE_BASEURL}/updateBlog/${currentUser?.email}`,
          state
        )
        .then((result) => {
          setLoading(false);
          navigate(`/blog/detail/${result.data.id}`);
          //id here is coming from created recipe.and using it to navigate to detail page after updating
        })
        .catch(() => {
          setLoading(false);
        });
    }
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
            {/* blog info part */}
            <div className="lg:w-1/2 px-10 space-y-3">
              <div className="">
                <h3 className="text-lg font-semibold mb-1">Preview image</h3>
                {/* images for selecting preview */}
                <div
                  className={`w-full h-52 p-1 rounded-lg bg-[#f4f3f3] ${
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
                          //used blog title case here to dispatch preview image
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

              {/* title input */}
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
              {/* tag input */}
              <div>
                <h4 className=" lg:pb-1">
                  Add or change tags so readers know what your story is about
                </h4>
                <div className="flex flex-wrap gap-x-1">
                  {state.tags.map((tag, index) => (
                    <div
                      className="flex gap-1 border-[1.3px] border-colorTwo pl-2 mb-1  rounded-lg"
                      key={index}
                    >
                      <p className="">{tag}</p>

                      {/* remove tag btn */}
                      <button
                        type="button"
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

                  <MyButton clickFunction={addTagsHandler}>Add tag</MyButton>
                </div>
              </div>
            </div>
            {/* creator info part and submit button */}
            <div className="lg:w-1/2 px-10 lg:mt-0 mt-5 ">
              <h3 className="text-xl font-semibold">
                <span className="text-base">Story by: </span>
                {user?.displayName}
              </h3>

              <MyButton
                loading={loading}
                clickFunction={createBlogHandler}
                disabledForOthers={!state.blogBody || !state.title}
              >
                {editMode ? "Update" : "Create"}
              </MyButton>
              <MyButton clickFunction={handleClose} variant={"outlined"}>
                Cancel
              </MyButton>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default BlogPublishModal;
