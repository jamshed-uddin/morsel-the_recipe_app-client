import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useEffect, useReducer, useRef, useState } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./AddRecipe.css";

import axios from "axios";

import useSingleUser from "../../hooks/useSingleUser";

const initialState = {
  recipeName: "",
  creatorInfo: "",
  recipeImages: [],
  description: "",
  ingredients: [""],
  instructions: [""],
  serving: "",
  prepTime: {
    hours: "",
    minutes: "",
  },
  cookTime: {
    hours: "",
    minutes: "",
  },
  tags: [],
  status: "pending",
  likedBy: [],
  createdAt: new Date().toString(),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TEXT_INPUT":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "IMAGES":
      return {
        ...state,
        [action.name]: action.value,
      };
    // cases for ingredients, instructions--add/ update/ remove
    case "ADD_FIELD":
      return {
        ...state,
        [action.name]: [...state[action.name], ""],
      };
    // REMOVE_FIELD  used for removing both tag and ingredient/instrunction field
    case "REMOVE_FIELD":
      return {
        ...state,
        [action.name]: state[action.name].filter(
          (_, index) => index !== action.index
        ),
      };
    // for updating ingredient/instruction field
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.name]: state[action.name].map((value, index) =>
          index === action.index ? action.value : value
        ),
      };
    // serving case
    case "SERVING":
      if (/^[0-9]{0,2}$/.test(action.value)) {
        return {
          ...state,
          [action.name]: parseInt(action.value),
        };
      }
      return state;
    // for cooking and preparing time
    case "TIME":
      if (/^[1-9]\d*$|^$/.test(action.value)) {
        return {
          ...state,
          [action.mainInput]: {
            ...state[action.mainInput],
            [action.name]: action.value,
          },
        };
      }
      return state;

    case "TAGS":
      return {
        ...state,
        [action.name]: [...state[action.name], ...action.value],
      };

    default:
      return state;
  }
};

const AddRecipe = () => {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const [selectedFiles, setSelectedFiles] = useState([]); //original array of files
  const [files, setFiles] = useState([]); //this state blobURLs(converted from fileList) for preview
  const [imageToPreview, setImageToPreview] = useState(0); //for setting which to preview from multiple images under the big preview
  const [tagInputValue, setTagInputValue] = useState(""); //this state used for storing initial user input for tags.
  const [loading, setLoading] = useState(false);
  const [scrollPosition, setScrollPosition] = useState({ left: 0, right: 7 });
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const imgContainerRef = useRef(null); //used this to make a image slider
  //state for showing specific error message
  const [errorsObj, setErrorsObj] = useState({
    recipeName: "",
    ingredients: "",
    instructions: "",
    serving: "",
    prepTime: "",
  });
  const { currentUser } = useSingleUser();

  // console.log(currentUser);

  // for the preview image slider with button
  useEffect(() => {
    // const imgContainer = document.querySelector(".img-container");
    const imgContainer = imgContainerRef.current;
    const handleScroll = () => {
      const scrollRight =
        imgContainer.scrollWidth -
        imgContainer.clientWidth -
        imgContainer.scrollLeft;
      setScrollPosition((prevState) => ({
        ...prevState,
        left: Math.floor(imgContainer.scrollLeft),
        right: Math.floor(scrollRight),
      }));
    };
    // checking if imgContainer overflowed to show the scroll btns
    const isImgContainerOverflowed =
      imgContainer.scrollWidth > imgContainer.clientWidth;
    setShowScrollBtn(isImgContainerOverflowed);

    imgContainer.addEventListener("scroll", handleScroll);

    return () => {
      imgContainer.removeEventListener("scroll", handleScroll);
    };
  }, [files]);

  // function for showing alert before user reload or goes back while changes made in form.
  useEffect(() => {
    console.log(window.history);

    if (
      formState.instructions.length === 1 &&
      formState.ingredients.length === 1 &&
      !formState.ingredients[0]
    ) {
      return;
    }

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      const confirmationMessage = "Are you sure you want to reload this page?";
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    };
    //TODO: prevent route change
    // const handleRouteChange = (currentLocation) => {
    //   const confirmationMessage = "Are you sure you want to leave this page?";

    //   if (!window.confirm(confirmationMessage)) {
    //     window.history.pushState(null, currentLocation);
    //   }
    // };

    window.addEventListener("beforeunload", handleBeforeUnload);
    // window.addEventListener(
    //   "popstate",
    //   handleRouteChange(window.location.href)
    // );

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // window.removeEventListener(
      //   "popstate",
      //   handleRouteChange(window.location.href)
      // );
    };
  }, [formState.ingredients, formState.instructions]);

  // handled input value of ingredients and instructions
  const handleInputValue = (name, value, index) => {
    dispatch({
      type: "UPDATE_FIELD",
      name: name,
      value: value,
      index,
    });

    //for better user experience creating another input field when user types in initial input field.
    //now user can manually add field or just type in current field and new input field will appear.
    const field = formState[name]; //got the ingredients/instructions array..
    if (field[index + 1] === undefined) {
      dispatch({ type: "ADD_FIELD", name: name });
    }

    //following condition to remove newly created field when user emptys the current field
    if (value === "") {
      dispatch({
        type: "REMOVE_FIELD",
        name: name,
        index: index + 1,
      });
    }
  };

  // functions for tags
  const addTags = () => {
    const newTags = tagInputValue.split(",").map((tag) => tag.trim());
    const filteredTags = newTags.filter((tag) => tag !== "");

    if (filteredTags.length > 0) {
      dispatch({ type: "TAGS", name: "tags", value: filteredTags });
      setTagInputValue("");
    }
  };

  //functions for files/images------------
  const filesHandler = (e) => {
    const imageObj = e.target.files;
    if (selectedFiles.length === 0) {
      setSelectedFiles(Array.from(imageObj));
    } else {
      setSelectedFiles((prev) => [...prev, ...Array.from(imageObj)]);
    }

    //stored these for uploading to the cloudinary when user submits the form
    const imgArr = Array.from(imageObj).map((image) =>
      URL.createObjectURL(image)
    );

    setFiles([...files, ...imgArr]);
    // dispatch({
    //   type: "IMAGES",
    //   name: "recipeImages",
    //   value: [...files, ...imgArr],
    // });
  };
  const scrollToRight = () => {
    if (imgContainerRef.current) {
      imgContainerRef.current.scrollLeft += 80;
    }
  };
  const scrollToLeft = () => {
    if (imgContainerRef.current) {
      imgContainerRef.current.scrollLeft -= 80;
    }
  };
  const removePreviwedImage = (imageIndex) => {
    const filesToModify = [...files];
    const selectedFilesToModify = [...selectedFiles];
    if (imageToPreview !== 0) {
      setImageToPreview((prevState) => prevState - 1);
    }
    filesToModify.splice(imageIndex, 1);
    selectedFilesToModify.splice(imageIndex, 1);
    setFiles(filesToModify);
    setSelectedFiles(selectedFilesToModify);
  };

  //uploading images to cloudinary when user submit the whole form.Because in that time user gets confirm about the images user wants to keep.Before that user may add or remove images.Uploading to cloudinary whenever user adds a image may affect the cloud storage(free plan).

  const inputValidationHandler = (form) => {
    const newErrorObj = { ...errorsObj };

    if (!form.recipeName.trim()) {
      newErrorObj.recipeName = "Title is required";
    } else {
      newErrorObj.recipeName = "";
    }
    if (form.ingredients.every((ingredient) => !ingredient.trim())) {
      newErrorObj.ingredients = "Ingredients is required";
    } else {
      newErrorObj.ingredients = "";
    }
    if (form.instructions.every((instruction) => !instruction.trim())) {
      newErrorObj.instructions = "Instructions is required";
    } else {
      newErrorObj.instructions = "";
    }
    if (Object.values(form.prepTime).every((value) => !value)) {
      newErrorObj.prepTime = "Prep time is required";
    } else {
      newErrorObj.prepTime = "";
    }
    if (!form.serving) {
      newErrorObj.serving = "Serving is required";
    } else {
      newErrorObj.serving = "";
    }

    setErrorsObj(newErrorObj);
    return newErrorObj;
    // console.log(newErrorObj);
  };

  //error component
  // eslint-disable-next-line react/prop-types
  function ErrorMessage({ message }) {
    return message ? (
      <p className="text-red-600  mr-1">{`${message}`}</p>
    ) : null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMessages = inputValidationHandler(formState);

    if (Object.values(errorMessages).some((value) => value)) {
      console.log("error detected");
      return;
    }

    setLoading(true);

    if (selectedFiles) {
      const uploader = selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_CLOUD_NAME
            }/image/upload`,
            formData,
            {
              headers: { "X-Requested-With": "XMLHttpRequest" },
            }
          );

          const imgurl = response.data.secure_url;
          return imgurl;
        } catch (error) {
          console.log(error);
          return null;
        }
      });

      try {
        Promise.all(uploader).then((imageURLs) => {
          if (imageURLs) {
            dispatch({
              type: "IMAGES",
              name: "recipeImages",
              value: [...formState["recipeImages"], ...imageURLs],
            });
            // passing only creator id .by this id we will get a recipe data populated creatorInfo with userInfo
            dispatch({
              type: "TEXT_INPUT",
              name: "creatorInfo",
              value: currentUser._id,
            });
          }

          axios
            .post(`${import.meta.env.VITE_BASEURL}createRecipe`, formState)
            .then((result) => {
              console.log(result);
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        });
      } catch (error) {
        console.log(error);
      }
    }

    console.log(formState);
  };

  // styles for input label
  const labelStyle = `block text-colorTwo text-2xl font-semibold `;
  return (
    <div className=" my-container text-colorTwo mt-4">
      <div className="lg:w-4/5 md:w-11/12 mx-auto md:shadow-xl md:rounded-xl h-full  py-10 px-5 relative">
        <div className="bg-bgColor z-20 flex justify-between items-center uppercase sticky top-0 left-0 right-0 shadow-sm py-3">
          <h1 className="md:text-3xl text-2xl font-bold text-colorOne">
            <span className="md:text-4xl text-3xl font-extrabold"></span>
            Add Recipe
          </h1>
        </div>
        {/* the recipe form  */}
        <div className="md:w-3/4 pt-4  mx-auto h-full">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* title ------------------*/}
            <div>
              <div className="flex justify-between items-end">
                <label className={labelStyle} htmlFor="recipeName">
                  Title
                </label>
                {formState.recipeName ? (
                  ""
                ) : (
                  <ErrorMessage message={errorsObj.recipeName} />
                )}
              </div>
              <input
                className=""
                type="text"
                name="recipeName"
                placeholder="Give your recipe a name"
                id="recipeName"
                value={formState.recipeName}
                onChange={(e) => {
                  dispatch({
                    type: "TEXT_INPUT",
                    name: e.target.name,
                    value: e.target.value,
                  });
                }}
              />
            </div>

            {/* image  input----------------*/}
            <div className="space-y-3">
              {/* main preview section */}
              <div
                className={`border-[1px] border-colorTwo rounded-xl w-full mx-auto h-60 md:h-80 flex items-center justify-center overflow-hidden select-none relative`}
              >
                <div className={`${files.length === 0 && "hidden"}`}>
                  <img
                    className={`w-full h-full object-cover  `}
                    src={files[imageToPreview]}
                    alt=""
                    draggable="false"
                  />
                  <div
                    onClick={() => removePreviwedImage(imageToPreview)}
                    className="absolute bottom-2 left-2 bg-bgColor text-colorOne rounded-full flex items-center p-[2px] cursor-pointer"
                  >
                    <DeleteOutlinedIcon />
                  </div>
                </div>
                <label
                  className={`w-full h-full text-center flex flex-col justify-center items-center leading-3 text-lg font-semibold ${
                    files.length > 0 && "hidden"
                  }`}
                  htmlFor="recipeImages"
                >
                  <CameraAltOutlinedIcon />
                  <span className="mt-1"> Add photos</span>
                </label>
                <input
                  onChange={filesHandler}
                  className="hidden"
                  id="recipeImages"
                  name="recipeImages"
                  type="file"
                  multiple
                />
              </div>

              {/* multiple image preview and add another image section*/}
              <div className={`relative ${!files.length && "hidden"}`}>
                <div
                  ref={imgContainerRef}
                  className="img-container overflow-x-auto scroll-smooth"
                >
                  {/* button for scroll */}
                  <p
                    onClick={scrollToLeft}
                    className={`absolute top-12  -left-3 text-white bg-colorOne   rounded-lg py-1 ${
                      showScrollBtn
                        ? scrollPosition.left > 0
                          ? "lg:flex items-center"
                          : "hidden"
                        : "hidden"
                    }   `}
                  >
                    <ArrowBackIosOutlinedIcon sx={{ fontSize: 20 }} />
                  </p>
                  <div className={`  flex gap-2 w-max`}>
                    {/* add another photo div */}
                    <div className="border-[1px] border-colorTwo md:h-32  md:w-32 w-28 h-28  grid place-items-center rounded-xl">
                      <label
                        className="h-full w-full  flex flex-col justify-center items-center leading-3 text-lg font-semibold"
                        htmlFor="recipeImages"
                      >
                        <CameraAltOutlinedIcon />
                        Add photos
                      </label>
                    </div>
                    {/* all added image preview  */}
                    {files.map((image, index) => (
                      <div
                        onClick={() => setImageToPreview(index)}
                        key={index}
                        className={` md:h-32  md:w-32 w-28 h-28 rounded-xl overflow-hidden ${
                          imageToPreview === index
                            ? "border-[3px] border-colorOne"
                            : "border-[3px] border-bgColor"
                        }`}
                      >
                        <img
                          className="w-full h-full object-cover"
                          src={image}
                          alt=""
                          draggable="false"
                        />
                      </div>
                    ))}
                  </div>
                  {/* button for scroll */}
                  <p
                    onClick={scrollToRight}
                    className={`absolute top-12  -right-3 text-white bg-colorOne   rounded-lg py-1 ${
                      showScrollBtn
                        ? scrollPosition.right > 0
                          ? "lg:flex items-center"
                          : "hidden"
                        : "hidden"
                    }`}
                  >
                    <ArrowForwardIosOutlinedIcon sx={{ fontSize: 20 }} />
                  </p>
                </div>
              </div>
            </div>

            {/* description ------------------*/}
            <div>
              <label className={labelStyle} htmlFor="description">
                Description
              </label>
              <textarea
                className=" "
                type="text"
                name="description"
                placeholder="Intruduce your recipe,add note,cooking tips,serving suggestions,etc..."
                id="description"
                value={formState.description}
                onChange={(e) => {
                  dispatch({
                    type: "TEXT_INPUT",
                    name: e.target.name,
                    value: e.target.value,
                  });
                }}
              />
            </div>

            {/* ingredients field ---------------*/}
            <div>
              <div className="flex justify-between items-end">
                <h4 className={labelStyle}>Ingredients</h4>
                {formState.ingredients[0] ? (
                  ""
                ) : (
                  <ErrorMessage message={errorsObj.ingredients} />
                )}
              </div>
              <div>
                {formState.ingredients.map((ingredient, index) => (
                  <div key={index} className="relative mb-1">
                    <input
                      onChange={(e) =>
                        handleInputValue(e.target.name, e.target.value, index)
                      }
                      type="text"
                      value={ingredient}
                      name="ingredients"
                      placeholder={
                        index === 0
                          ? "e.g. 2 cups flour, sifted"
                          : "Add another ingredient"
                      }
                      key={`ingredient-${index}`}
                    />
                    {/* btn for removing ingredient field */}
                    <p
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FIELD",
                          name: "ingredients",
                          index,
                        })
                      }
                      className="absolute top-3 right-1 opacity-50 hover:opacity-100 "
                      disabled={formState.ingredients.length === 1}
                    >
                      <CloseOutlinedIcon sx={{ fontSize: 30 }} />
                    </p>
                  </div>
                ))}
              </div>

              {/* button for adding  new ingredient field */}
              <button
                type="button"
                onClick={() =>
                  dispatch({ type: "ADD_FIELD", name: "ingredients" })
                }
                className="text-white text-lg font-semibold px-3 py-1 bg-colorOne hover:bg-opacity-80  rounded-xl mt-3"
              >
                + Add ingredients
              </button>
            </div>

            {/* Instructions field ----------------*/}
            <div>
              <div className="flex justify-between items-end">
                <h4 className={labelStyle}>Instructions</h4>
                {formState.instructions[0] ? (
                  ""
                ) : (
                  <ErrorMessage message={errorsObj.instructions} />
                )}
              </div>
              <div>
                {formState.instructions.map((instruction, index) => (
                  <div key={index} className="relative mb-1">
                    <textarea
                      onChange={(e) =>
                        handleInputValue(e.target.name, e.target.value, index)
                      }
                      type="text"
                      placeholder={
                        index === 0
                          ? "e.g. Preheat oven to 350 degrees F..."
                          : "Add another instruction"
                      }
                      value={instruction}
                      name="instructions"
                      key={`instruction-${index}`}
                    />
                    {/* button for removing Instructions field */}
                    <p
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FIELD",
                          name: "instructions",
                          index,
                        })
                      }
                      className="absolute top-3 right-1 opacity-50 hover:opacity-100 "
                      disabled={formState.instructions.length === 1}
                    >
                      <CloseOutlinedIcon sx={{ fontSize: 30 }} />
                    </p>
                  </div>
                ))}
              </div>
              {/* button for adding  new Instructions field */}
              <button
                type="button"
                onClick={() =>
                  dispatch({ type: "ADD_FIELD", name: "instructions" })
                }
                className="text-white text-lg font-semibold px-3 py-1 bg-colorOne hover:bg-opacity-80   rounded-xl mt-3"
              >
                + Add instruction
              </button>
            </div>

            {/* serving ------------------ */}
            <div>
              <div className="flex justify-between items-end">
                <label className={labelStyle} htmlFor="serving">
                  Serving
                </label>
                {formState.serving[0] ? (
                  ""
                ) : (
                  <ErrorMessage message={errorsObj.serving} />
                )}
              </div>
              <input
                className=" "
                type="text"
                name="serving"
                placeholder="#"
                id="serving"
                value={formState.serving}
                onChange={(e) =>
                  dispatch({
                    type: "SERVING",
                    name: e.target.name,
                    value: e.target.value,
                  })
                }
              />
            </div>

            {/* prep time ---------------*/}
            <div>
              <div className="flex justify-between items-end">
                <h2 className={labelStyle}>Prep time</h2>
                {Object.values(formState.prepTime).some((value) => value) ? (
                  ""
                ) : (
                  <ErrorMessage message={errorsObj.prepTime} />
                )}
              </div>
              <div className="flex gap-3">
                <div className="flex-grow ">
                  <input
                    className=""
                    type="text"
                    name="hours"
                    placeholder="Hours"
                    value={formState.prepTime.hours}
                    onChange={(e) =>
                      dispatch({
                        type: "TIME",
                        mainInput: "prepTime",
                        name: e.target.name,
                        value: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex-grow ">
                  <input
                    className=" "
                    type="text"
                    name="minutes"
                    placeholder="minutes"
                    value={formState.prepTime.minutes}
                    onChange={(e) =>
                      dispatch({
                        type: "TIME",
                        mainInput: "prepTime",
                        name: e.target.name,
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* cook time ---------------*/}
            <div>
              <h2 className={labelStyle}>
                Cook time <span className="text-base">(optional)</span>
              </h2>
              <div className="flex gap-3">
                <div className="flex-grow ">
                  <input
                    className=""
                    type="text"
                    name="hours"
                    placeholder="Hours"
                    value={formState.cookTime.hours}
                    onChange={(e) =>
                      dispatch({
                        type: "TIME",
                        mainInput: "cookTime",
                        name: e.target.name,
                        value: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex-grow ">
                  <input
                    className=" "
                    type="text"
                    name="minutes"
                    placeholder="minutes"
                    value={formState.cookTime.minutes}
                    onChange={(e) =>
                      dispatch({
                        type: "TIME",
                        mainInput: "cookTime",
                        name: e.target.name,
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* tags --------------*/}
            <div>
              <h4 className={labelStyle}>
                Add tags <span className="text-base">(optional)</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {formState.tags.map((tag, index) => (
                  <div
                    className="flex gap-1 border-[1.3px] border-colorTwo mb-1 pl-2 py-1 rounded-xl"
                    key={index}
                  >
                    <p className="">{tag}</p>

                    {/* remove tag btn */}
                    <p
                      onClick={() =>
                        dispatch({ type: "REMOVE_FIELD", name: "tags", index })
                      }
                    >
                      <CloseOutlinedIcon />
                    </p>
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
                  type="button"
                  onClick={addTags}
                  className="text-white text-lg font-semibold px-3 py-1 bg-colorOne   rounded-xl mt-3"
                >
                  + Add tag
                </button>
              </div>
            </div>

            {/* submit button ------------*/}
            <div className="text-end">
              <button
                type="submit"
                className={`text-white text-lg font-semibold px-3 py-1 bg-colorOne   rounded-xl mt-3 ${
                  loading && "bg-opacity-50 cursor-not-allowed"
                }`}
                disabled={loading}
              >
                Submit recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
