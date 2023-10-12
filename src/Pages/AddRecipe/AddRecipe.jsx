import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useEffect, useReducer, useRef, useState } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./AddRecipe.css";

const initialState = {
  recipeName: "",
  creatorName: "",
  creatorId: "",
  recipeImages: [],
  description: "",
  ingredients: [""],
  instructions: [""],
  serving: 0,
  prepTime: 0,
  cookTime: 0,
  likedBy: [],
  savedBy: [],
  createdAt: new Date().toString(),
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "TEXT_INPUT":
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
    case "REMOVE_FIELD":
      return {
        ...state,
        [action.name]: state[action.name].filter(
          (_, index) => index !== action.index
        ),
      };
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.name]: state[action.name].map((value, index) =>
          index === action.index ? action.value : value
        ),
      };

    default:
      return state;
  }
};

const AddRecipe = () => {
  const [formState, dispatch] = useReducer(reducer, initialState);

  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [tagInputValue, setTagInputValue] = useState("");
  const [files, setFiles] = useState([]);
  const [imageToPreview, setImageToPreview] = useState(0);
  const [tags, setTags] = useState([]);
  const [scrollPosition, setScrollPosition] = useState({ left: 0, right: 7 });
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const imgContainerRef = useRef(null);

  // console.log(formState);

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
    if (
      instructions.length === 1 &&
      ingredients.length === 1 &&
      !ingredients[0]
    ) {
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
  }, [ingredients, instructions]);

  //functions for adding, removing and handling ingredient changes
  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredient = [...ingredients];
    updatedIngredient[index] = value;
    setIngredients(updatedIngredient);
  };

  //functions for adding, removing and handling instruction/cooking steps changes
  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const removeInstruction = (index) => {
    const updatedIngredients = [...instructions];
    updatedIngredients.splice(index, 1);
    setInstructions(updatedIngredients);
  };

  const handleInstructionChange = (index, value) => {
    const updatedIngredient = [...instructions];
    updatedIngredient[index] = value;
    setInstructions(updatedIngredient);
  };

  // functions for tags
  const addTags = () => {
    const newTags = tagInputValue.split(",").map((tag) => tag.trim());

    const filteredTags = newTags.filter((tag) => tag !== "");

    if (filteredTags.length > 0) {
      setTags([...tags, ...filteredTags]);
      setTagInputValue("");
    }
  };

  const handleTagChange = (e) => {
    setTagInputValue(e.target.value);
  };
  const removeTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  //functions for files/images------------
  const filesHandler = (e) => {
    const imageObj = e.target.files;
    const imgArr = Array.from(imageObj).map((image) =>
      URL.createObjectURL(image)
    );
    setFiles([...files, ...imgArr]);
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
    if (imageToPreview !== 0) {
      setImageToPreview((prevState) => prevState - 1);
    }
    filesToModify.splice(imageIndex, 1);
    setFiles(filesToModify);
  };

  // styles for input label
  const labelStyle = `block text-colorTwo text-2xl font-semibold `;
  return (
    <div className=" my-container text-colorTwo">
      <div className="lg:w-4/5 md:w-11/12 mx-auto md:shadow-xl md:rounded-xl h-full py-10 px-5 relative">
        <div className="bg-bgColor z-20 flex justify-between items-center uppercase sticky top-0 left-0 right-0 shadow-sm py-3">
          <h1 className="md:text-3xl text-2xl font-bold text-colorOne">
            <span className="md:text-4xl text-3xl font-extrabold">
              <sup>+</sup>
            </span>
            Add Recipe
          </h1>
        </div>
        {/* the recipe form  */}
        <div className="md:w-3/4 pt-4  mx-auto h-full">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {/* title ---------------------*/}
            <div>
              <label className={labelStyle} htmlFor="recipeName">
                Title
              </label>
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

            {/* image  input-----------------------*/}
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
                  htmlFor="RecipeThumbnail"
                >
                  <CameraAltOutlinedIcon />
                  Add photos
                </label>
                <input
                  onChange={filesHandler}
                  className="hidden"
                  id="RecipeThumbnail"
                  type="file"
                  src=""
                  alt=""
                  multiple
                />
              </div>

              {/* multiple image preview and add another image section*/}
              <div className={`relative ${!files.length && "hidden"}`}>
                <div
                  ref={imgContainerRef}
                  className="img-container overflow-x-auto scroll-smooth"
                >
                  <button
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
                  </button>
                  <div className={`  flex gap-2 w-max`}>
                    {/* add another photo div */}
                    <div className="border-[1px] border-colorTwo md:h-32  md:w-32 w-28 h-28  grid place-items-center rounded-xl">
                      <label
                        className="h-full w-full  flex flex-col justify-center items-center leading-3 text-lg font-semibold"
                        htmlFor="RecipeThumbnail"
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
                  <button
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
                  </button>
                </div>
              </div>
            </div>

            {/* description ----------------------*/}
            <div>
              <label className={labelStyle} htmlFor="description">
                Description
              </label>
              <textarea
                className=" "
                type="text"
                name="description"
                placeholder="Intruduce your recipe,add note,cooking tips,serving suggestions,etc..."
                id="title"
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

            {/* ingredients field */}
            <div>
              <h4 className={labelStyle}>Ingredients</h4>
              <div>
                {formState.ingredients.map((ingredient, index) => (
                  <div key={index} className="relative mb-1">
                    <input
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_FIELD",
                          name: "ingredients",
                          value: e.target.value,
                          index,
                        })
                      }
                      type="text"
                      value={ingredient}
                      placeholder={
                        index === 0
                          ? "e.g. 2 cups flour, sifted"
                          : "Add another ingredient"
                      }
                      key={`ingredient-${index}`}
                    />
                    {/* btn for removing ingredient field */}
                    <button
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
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() =>
                  dispatch({ type: "ADD_FIELD", name: "ingredients" })
                }
                className="text-white text-lg font-semibold px-3 py-1 bg-colorOne hover:bg-opacity-80  rounded-xl mt-3"
              >
                + Add ingredients
              </button>
            </div>

            {/* Instructions field */}
            <div>
              <h4 className={labelStyle}>Instructions</h4>
              <div>
                {formState.instructions.map((instruction, index) => (
                  <div key={index} className="relative mb-1">
                    <textarea
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_FIELD",
                          name: "instruction",
                          value: e.target.value,
                          index,
                        })
                      }
                      type="text"
                      placeholder={
                        index === 0
                          ? "e.g. Preheat oven to 350 degrees F..."
                          : "Add another instruction"
                      }
                      value={instruction}
                      key={`instruction-${index}`}
                    />
                    <button
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
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() =>
                  dispatch({ type: "ADD_FIELD", name: "instructions" })
                }
                className="text-white text-lg font-semibold px-3 py-1 bg-colorOne hover:bg-opacity-80   rounded-xl mt-3"
              >
                + Add instruction
              </button>
            </div>

            {/* serving */}
            <div>
              <label className={labelStyle} htmlFor="serving">
                Serving
              </label>
              <input
                className=" "
                type="number"
                name="serving"
                placeholder="#"
                id="serving"
                min="0"
                max="99"
              />
            </div>

            {/* prep time */}
            <div>
              <h2 className={labelStyle}>Prep time</h2>
              <div className="flex gap-3">
                <div className="flex-grow ">
                  <input
                    className=""
                    type="number"
                    name="PrepHours"
                    placeholder="Hours"
                    id="PrepHours"
                  />
                </div>

                <div className="flex-grow ">
                  <input
                    className=" "
                    type="number"
                    name="prepMinutes"
                    placeholder="minutes"
                    id="prepMinutes"
                  />
                </div>
              </div>
            </div>

            {/* cook time */}
            <div>
              <h2 className={labelStyle}>
                Cook time <span className="text-base">(optional)</span>
              </h2>
              <div className="flex gap-3">
                <div className="flex-grow ">
                  <input
                    className=""
                    type="number"
                    name="cookHours"
                    placeholder="Hours"
                    id="cookHours"
                  />
                </div>

                <div className="flex-grow ">
                  <input
                    className=" "
                    type="number"
                    name="cookMinutes"
                    placeholder="minutes"
                    id="cookMinutes"
                  />
                </div>
              </div>
            </div>

            {/* tags */}
            <div>
              <h4 className={labelStyle}>
                Add tags <span className="text-base">(optional)</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <div
                    className="flex gap-1 border-[1.3px] border-colorOne pl-2 py-1 rounded-2xl"
                    key={index}
                  >
                    <p className="">{tag}</p>
                    <button onClick={() => removeTag(index)}>
                      <CloseOutlinedIcon />
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <input
                  onChange={handleTagChange}
                  className=""
                  type="text"
                  name="tags"
                  value={tagInputValue}
                  placeholder=""
                  id="title"
                />
                <button
                  onClick={addTags}
                  className="text-white text-lg font-semibold px-3 py-1 bg-colorOne hover:bg-opacity-80  rounded-xl mt-3"
                >
                  + Add tag
                </button>
              </div>
            </div>

            {/* submit button */}
            <div className="text-end">
              <button
                type="submit"
                className="text-white text-lg font-semibold px-3 py-1 bg-colorOne hover:bg-opacity-80  rounded-xl mt-3"
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
