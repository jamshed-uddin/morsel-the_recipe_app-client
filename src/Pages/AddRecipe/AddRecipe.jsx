import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useEffect, useReducer, useRef, useState } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import "./AddRecipe.css";

import axios from "axios";

import useSingleUser from "../../hooks/useSingleUser";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import MyButton from "../../Components/Button/MyButton";

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
  categories: [],
  feedback: "",
  likedBy: [],
  createdAt: new Date().toString(),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "RECIPE_DATA_FOR_EDIT":
      return {
        ...state,
        ...action.recipeDataForEdit,
      };

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

    case "ADD_HEADER":
      if (
        state[action.name].at(0).header ||
        state[action.name].at(0).header === ""
      ) {
        return {
          ...state,
          [action.name]: [...state[action.name], { header: "" }],
        };
      } else {
        return {
          ...state,
          [action.name]: [{ header: "" }, ...state[action.name]],
        };
      }

    // REMOVE_FIELD  used for removing both tag and ingredient/instrunction field
    case "REMOVE_FIELD":
      return {
        ...state,
        [action.name]: state[action.name].filter(
          (_, index) => index !== action.index
        ),
      };
    // for updating ingredient/instruction field
    // case "UPDATE_FIELD":
    //   return {
    //     ...state,
    //     [action.name]: state[action.name].map((value, index) =>
    //       index === action.index ? action.value : value
    //     ),
    //   };
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.name]: state[action.name].map((value, index) =>
          index === action.index
            ? typeof value === "object"
              ? { ...value, header: action.value }
              : action.value
            : value
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

  // image states starts
  const [files, setFiles] = useState([]); //this state blobURLs(converted from fileList) for instant preview
  const [imageToPreview, setImageToPreview] = useState(0); //for setting which to preview from multiple images under the big preview(using this as index)
  const [imageUploadLoading, setImageUploadLoading] = useState(false); //loading state for image uploading
  const [public_id, setPublic_id] = useState([]);
  // image state ends
  const [tagInputValue, setTagInputValue] = useState(""); //this state used for storing initial user input for tags.
  const [loading, setLoading] = useState(false); //loading state for submiting or updating
  const [scrollPosition, setScrollPosition] = useState({ left: 0, right: 7 });
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const imgContainerRef = useRef(null); //used this to make a image slider
  const [showTagInfo, setShowTagInfo] = useState(false);
  //state for showing specific error message
  const [categories] = useState([
    "bread",
    "soup",
    "healthy",
    "breakfast",
    "cake",
    "chicken",
    "salad",
    "salmon",
    "keto",
    "quick",
    "easy",
    "other",
  ]);
  const { currentUser } = useSingleUser();
  const [errorsObj, setErrorsObj] = useState({
    recipeName: "",
    ingredients: "",
    instructions: "",
    serving: "",
    prepTime: "",
  });
  const navigate = useNavigate();

  // When user navigate to this page for edit the item it comes with item id and and item data floods the initialState
  //for edit mode------------ starts
  const [editMode, setEditMode] = useState(false);
  const { id } = useParams();

  // using the add recipe form for editing recipe ..
  const { isLoading, data, error } = useQuery(
    ["recipeDetail", id],

    async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BASEURL}/singleRecipe/${id}`
      );
      return result.data;
    },
    { enabled: !!id } //query only enables when id is true or there is a id(id that comes in params)
  );

  useEffect(() => {
    if (data) {
      setEditMode(true);

      // setting entire recipe data for edit to initial state
      dispatch({ type: "RECIPE_DATA_FOR_EDIT", recipeDataForEdit: data });

      // dispatching the creatorId in creatorInfo right way because it comes with whole creatorInfo gets prevented by schema
      dispatch({
        type: "TEXT_INPUT",
        name: "creatorInfo",
        value: currentUser?._id,
      });

      // getting publicId part from url and setting it to public_id state.it requires for deleting image from cloudinary
      if (data.recipeImages.length) {
        setFiles(data.recipeImages);

        const public_id = data.recipeImages.map((url) => {
          const splitedURL = url.split("/");
          const publicIdPart = `${splitedURL.at(-2)}/${splitedURL
            .at(-1)
            .split(".")
            .at(0)}`;
          return publicIdPart;
        });
        setPublic_id(public_id);
      }
    }
  }, [data, currentUser]);

  //  edit mode block ends -------------------------------

  // dispatching the creatorInfo when not in editmode
  useEffect(() => {
    if (!editMode) {
      dispatch({
        type: "TEXT_INPUT",
        name: "creatorInfo",
        value: currentUser?._id,
      });
    }
  }, [currentUser, editMode]);

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
    if (
      formState.instructions.length <= 1 &&
      formState.ingredients.length <= 1
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

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
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
    if (
      field[index + 1] === undefined &&
      (typeof field[index] !== "object" ||
        field.indexOf(field[index]) === field.length - 1)
    ) {
      dispatch({ type: "ADD_FIELD", name: name });
    }

    //following condition to remove newly created field when user emptys the current field
    if (value === "" && typeof field[index] !== "object") {
      dispatch({
        type: "REMOVE_FIELD",
        name: name,
        index: index + 1,
      });
    }
  };

  // functions for tags categories
  const addTags = () => {
    const newTags = tagInputValue.split(",").map((tag) => tag.trim());
    const filteredTags = newTags.filter((tag) => tag !== "");

    if (filteredTags.length > 0) {
      dispatch({ type: "TAGS", name: "tags", value: filteredTags });
      setTagInputValue("");

      const filteredCategories = filteredTags.filter((tag) =>
        categories.includes(tag)
      );

      // using image adding dispatch
      dispatch({
        type: "IMAGES",
        name: "categories",
        value: [
          ...formState["categories"],
          ...(filteredCategories || "others"),
        ],
      });
    }
  };
  const removeTagHandler = (index, tag) => {
    dispatch({ type: "REMOVE_FIELD", name: "tags", index });

    const existingCategories = [...formState.categories];
    const reducedCategories = existingCategories.filter((cate) => cate !== tag);
    dispatch({
      type: "IMAGES",
      name: "categories",
      value: reducedCategories,
    });
    console.log("reduce", reducedCategories);
  };

  const addHeaderHandler = (field) => {
    if (
      typeof formState[field][0] === "object" &&
      typeof formState[field][formState[field].length - 1] === "object"
    ) {
      return;
    }

    dispatch({ type: "ADD_HEADER", name: field });
  };

  //functions for files/images------------
  const filesHandler = (e) => {
    const imageObj = e.target.files;
    Array.from(imageObj).map((image) => {
      const imageBlobURL = URL.createObjectURL(image);
      setFiles([...files, imageBlobURL]);
    });

    // uploading to cloud
    const uploader = Array.from(imageObj).map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
      try {
        setImageUploadLoading(true);
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME
          }/image/upload`,
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        );
        // console.log(response);
        const imgurl = response?.data.secure_url;
        // setting image public_id.it requires for deleting from cloud
        setPublic_id((prevState) => [...prevState, response?.data.public_id]);
        return imgurl;
      } catch (error) {
        return null;
      }
    });

    // promise all for getting all url at once after uploading is finished
    Promise.all(uploader)
      .then((imageURLs) => {
        setImageUploadLoading(false);

        dispatch({
          type: "IMAGES",
          name: "recipeImages",
          value: [...formState["recipeImages"], ...imageURLs],
        });
      })
      .catch(() => {});
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

  const removePreviwedImage = async (imageIndex) => {
    const filesToModify = [...files];
    const recipeImageToModify = [...formState.recipeImages];

    if (imageToPreview !== 0) {
      setImageToPreview((prevState) => prevState - 1);
    }
    filesToModify.splice(imageIndex, 1);
    recipeImageToModify.splice(imageIndex, 1);
    dispatch({
      type: "IMAGES",
      name: "recipeImages",
      value: recipeImageToModify,
    });
    setFiles(filesToModify);

    async function digestMessage() {
      const dToSign = `public_id=${public_id.at(
        imageIndex
      )}&timestamp=${Math.floor(Date.now() / 1000)}${
        import.meta.env.VITE_CLOUDY_API_SECRET
      }`;
      const msgUint8 = new TextEncoder().encode(dToSign);
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""); // convert bytes to hex string
      return hashHex;
    }
    await digestMessage()
      .then(async (hash) => {
        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_CLOUD_NAME
            }/image/destroy`,
            {
              public_id: public_id.at(imageIndex),
              api_key: import.meta.env.VITE_APIKEY,
              signature: hash,
              timestamp: Math.floor(Date.now() / 1000),
            },
            {
              headers: {
                "X-Requested-With": "XMLHttpRequest",
              },
            }
          );
          // console.log(response);
          const public_idToModify = [...public_id];
          public_idToModify.splice(imageIndex, 1);
          setPublic_id(public_idToModify);
        } catch (error) {
          const public_idToModify = [...public_id];
          public_idToModify.splice(imageIndex, 1);
          setPublic_id(public_idToModify);
          return null;
        }
      })
      .catch(() => {});
  };
  // image functions ends

  const inputValidationHandler = (form) => {
    const newErrorObj = { ...errorsObj };

    if (!form.recipeName.trim()) {
      newErrorObj.recipeName = "Title is required";
    } else {
      newErrorObj.recipeName = "";
    }
    if (form.ingredients.every((ingredient) => !ingredient)) {
      newErrorObj.ingredients = "Ingredients is required";
    } else {
      newErrorObj.ingredients = "";
    }
    if (form.instructions.every((instruction) => !instruction)) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessages = inputValidationHandler(formState);
    if (Object.values(errorMessages).some((value) => value)) {
      return;
    }

    setLoading(true);

    if (!editMode) {
      await axios
        .post(`${import.meta.env.VITE_BASEURL}/createRecipe`, formState)
        .then((result) => {
          setLoading(false);
          navigate(`/recipe/detail/${result.data.id}`);
          //id here is coming from created recipe.and using it to navigate to detail page after creating
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      await axios
        .put(
          `${import.meta.env.VITE_BASEURL}/updateRecipe/${currentUser?.email}`,
          formState
        )
        .then((result) => {
          console.log("updatedRecipe", result);
          setLoading(false);
          navigate(`/recipe/detail/${result.data.id}`);
          //id here is coming from created recipe.and using it to navigate to detail page after updating
        })
        .catch(() => {
          setLoading(false);
        });
    }

    // console.log(formState);
  };

  // styles for input label
  const labelStyle = `block text-colorTwo text-2xl font-semibold `;
  return (
    <div className=" my-container text-colorTwo">
      <div className="lg:w-4/5 md:w-11/12 mx-auto md:shadow md:rounded-xl h-full  pb-10 lg:px-5 relative">
        <div className="bg-bgColor py-2  z-20 flex justify-between items-center uppercase sticky top-0 left-0 right-0 shadow-sm ">
          <h1 className="md:text-3xl text-2xl font-bold text-colorOne">
            {editMode ? "Edit" : "Add"} Recipe
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
                className={`${
                  files.length ? "" : "border-[1px] border-colorTwo"
                } rounded-xl w-full mx-auto h-60 md:h-80 flex items-center justify-center overflow-hidden select-none relative`}
              >
                <div className={`${files.length === 0 && "hidden"}`}>
                  <img
                    className={`w-full h-full object-cover `}
                    src={files[imageToPreview]}
                    alt=""
                    draggable="false"
                  />
                  <button
                    type="button"
                    onClick={() => removePreviwedImage(imageToPreview)}
                    className={`absolute bottom-2 left-2 bg-bgColor text-colorOne rounded-full flex items-center p-[2px] cursor-pointer ${
                      imageUploadLoading ? "opacity-60" : ""
                    }`}
                    disabled={imageUploadLoading}
                  >
                    <DeleteOutlinedIcon />
                  </button>
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
                  className="img-container overflow-x-auto scroll-smooth py-1"
                >
                  {/* button for scroll (right)*/}
                  <p
                    onClick={scrollToLeft}
                    className={`cursor-pointer  absolute top-12 -left-2 md:-left-3 text-white bg-colorOne   rounded-lg py-1 ${
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
                    <div className="cursor-pointer border-[1px] border-colorTwo md:h-32  md:w-32 w-28 h-28  grid place-items-center rounded-xl">
                      <label
                        className="h-full w-full  flex flex-col justify-center items-center leading-3 text-lg font-semibold mt-1"
                        htmlFor="recipeImages2"
                      >
                        <input
                          onChange={filesHandler}
                          className="hidden"
                          id="recipeImages2"
                          name="recipeImages"
                          type="file"
                          multiple
                        />
                        <CameraAltOutlinedIcon />
                        <span className="mt-1">Add photos</span>
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
                  {/* button for scroll (left)*/}
                  <p
                    onClick={scrollToRight}
                    className={`cursor-pointer  absolute top-12 -right-2 md:-right-3 text-white bg-colorOne   rounded-lg py-1 ${
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
                  <div
                    key={index}
                    className={`relative mb-2 ${
                      typeof ingredient === "object" ? "font-semibold" : ""
                    }`}
                  >
                    <input
                      onChange={(e) =>
                        handleInputValue(e.target.name, e.target.value, index)
                      }
                      type="text"
                      value={
                        typeof ingredient === "object"
                          ? ingredient.header
                          : ingredient
                      }
                      name="ingredients"
                      placeholder={
                        typeof ingredient === "object"
                          ? "Add a header, e.g, For the gravy"
                          : index === 0
                          ? "e.g. 2 tablespoons butter, softened"
                          : index === 1
                          ? "e.g. 2 cups flour, sifted"
                          : "Add another ingredient"
                      }
                      key={`ingredient-${index}`}
                    />
                    {/* btn for removing ingredient field */}
                    <button
                      type="button"
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FIELD",
                          name: "ingredients",
                          index,
                        })
                      }
                      className="absolute top-2 right-1 opacity-50 hover:opacity-100 "
                      disabled={formState.ingredients.length === 1}
                    >
                      <CloseOutlinedIcon sx={{ fontSize: 30 }} />
                    </button>
                  </div>
                ))}
              </div>

              {/* button for adding  new ingredient field */}
              <MyButton
                type={"button"}
                clickFunction={() =>
                  dispatch({ type: "ADD_FIELD", name: "ingredients" })
                }
              >
                Add ingredients
              </MyButton>
              <MyButton
                type={"button"}
                clickFunction={() => addHeaderHandler("ingredients")}
              >
                Add header
              </MyButton>
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
                  <div
                    key={index}
                    className={`relative  ${
                      typeof instruction === "object" ? "font-semibold" : ""
                    }`}
                  >
                    <textarea
                      onChange={(e) =>
                        handleInputValue(e.target.name, e.target.value, index)
                      }
                      type="text"
                      placeholder={
                        typeof instruction === "object"
                          ? "Add a header, e.g, For the gravy"
                          : index === 0
                          ? "e.g. Pre heat the oven to 350 degrees F"
                          : index === 1
                          ? "e.g. Pour into  grease trays and bake for 15-20 minutes"
                          : "Add another instruction"
                      }
                      value={
                        typeof instruction === "object"
                          ? instruction.header
                          : instruction
                      }
                      name="instructions"
                      key={`instruction-${index}`}
                    />
                    {/* button for removing Instructions field */}
                    <button
                      type="button"
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
              {/* button for adding  new Instructions field */}
              <MyButton
                type={"button"}
                clickFunction={() =>
                  dispatch({ type: "ADD_FIELD", name: "instructions" })
                }
              >
                Add instruction
              </MyButton>
              <MyButton
                type={"button"}
                clickFunction={() => addHeaderHandler("instructions")}
              >
                Add header
              </MyButton>
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
                <span
                  onClick={() => setShowTagInfo((p) => !p)}
                  className="ml-1 cursor-pointer"
                >
                  <HelpOutlineOutlinedIcon sx={{ fontSize: 18 }} />
                </span>
              </h4>

              <div className="flex flex-wrap gap-2">
                {formState.tags.map((tag, index) => (
                  <div
                    className="flex items-center gap-1 border-[1.3px]  border-colorTwo mb-1 pl-2  rounded-lg"
                    key={index}
                  >
                    <p className="text-lg">{tag}</p>

                    {/* remove tag btn */}
                    <p
                      className="cursor-pointer"
                      onClick={() => removeTagHandler(index, tag)}
                    >
                      <CloseOutlinedIcon sx={{ fontSize: 18 }} />
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 relative">
                <input
                  className=""
                  type="text"
                  name="tags"
                  value={tagInputValue}
                  placeholder="e.g., italian,appetizer,quick,easy"
                  id="tags"
                  onChange={(e) => setTagInputValue(e.target.value)}
                />
                <div className="absolute bottom-2 right-1 rounded-xl pl-3 bg-bgColor">
                  <button type="button" onClick={addTags}>
                    <AddOutlinedIcon sx={{ fontSize: 35 }} />
                  </button>
                </div>
              </div>
              <div className="h-fit overflow-hidden">
                <h4
                  className={`lg:pb-1 text-lg font-light transition-all duration-500 ${
                    showTagInfo ? "translate-y-0" : "-translate-y-6"
                  }`}
                >
                  Add or change tags for more recognition and to categorize your
                  recipe.
                </h4>
              </div>
            </div>

            {/* submit button ------------*/}
            <div className="text-end pt-6">
              <MyButton type={"submit"} loading={loading}>
                {editMode ? "Update" : "Submit"} recipe
              </MyButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
