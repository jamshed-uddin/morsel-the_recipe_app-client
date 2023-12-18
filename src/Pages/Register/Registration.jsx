import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import "./Registration.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useAuthContext from "../../hooks/useAuthContext";
import axios from "axios";

const Registration = () => {
  const {
    loading,
    setLoading,
    registerUser,
    updateUserNamePhoto,
    signInWithGoogle,
  } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    ConfirmPassword: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleInputChange = (e) => {
    setError("");
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginData = (e) => {
    e.preventDefault();
    if (!formData.name) {
      return setError("Please fill the name field");
    }
    if (!formData.email) {
      return setError("Please fill the email field");
    }
    if (!formData.password) {
      return setError("Please fill the password field");
    }
    if (!formData.ConfirmPassword) {
      return setError("Please retype the password");
    }
    if (formData.password.length < 8) {
      return setError("Password length must be 8 ");
    }
    if (formData.password !== formData.ConfirmPassword) {
      return setError("Password does not match");
    }

    registerUser(formData.email, formData.password)
      .then((data) => {
        if (data.user) {
          updateUserNamePhoto(formData.name, "");

          const body = {
            name: formData.name,
            email: formData.email,
            photoURL: "",
            role: "creator",
          };

          axios
            .post(`${import.meta.env.VITE_BASEURL}newUser`, body)
            .then((res) => {
              if (res.data.message) {
                console.log(res.data);
                setLoading((prev) => !prev);
                navigate(from, { replace: true });
              }
            });
        }
      })
      .catch((error) => {
        setLoading((prev) => !prev);
        console.log(error.message);

        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setError("User with this email already exist!");
          setLoading((prev) => !prev);
        }
      });

    setError("");
  };

  const labelStyle = `block text-colorTwo text-lg font-semibold `;

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="w-full lg:w-4/5 h-5/6  lg:mx-auto lg:flex   rounded-2xl overflow-hidden lg:shadow-lg">
        <div className="w-1/2 h-full hidden lg:block">
          <img
            className="object-cover w-full h-full"
            src="https://i.ibb.co/dJb4HYw/top-view-delicious-food-table-still-life-2.jpg"
            alt=""
          />
        </div>
        <div className="px-4 lg:px-0 lg:w-1/2 h-full pb-2  overflow-y-auto ">
          {/* Title text not button */}
          <h1 className="text-colorOne text-5xl font-bold  tracking-tighter uppercase ">
            sign up
          </h1>

          <div className="space-y-2 lg:w-3/4 px-2 lg:px-0   mt-7 mx-auto">
            <form autoComplete="off" onSubmit={handleLoginData}>
              <div>
                <label className={labelStyle} htmlFor="name">
                  Name
                </label>
                {/*got input styles moved to index.css file */}
                <input
                  className="  "
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  id="name"
                />
              </div>
              <div>
                <label className={labelStyle} htmlFor="email">
                  Email
                </label>
                <input
                  className="  "
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email"
                  id="email"
                />
              </div>
              <div className="relative">
                <label className={labelStyle} htmlFor="password">
                  Password
                </label>
                <input
                  className=" py-2 px-1 rounded-lg text-lg border-[1.5px] border-colorOne outline-none w-full  mt-1 "
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  id="password"
                />
                <div
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                  className="absolute right-2 bottom-3 cursor-pointer "
                >
                  {showPassword ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </div>
              </div>
              <div className="relative">
                <label className={labelStyle} htmlFor="ConfirmPassword">
                  Confirm Password
                </label>
                <input
                  className=" py-2 px-1 rounded-lg text-lg border-[1.5px] border-colorOne outline-none w-full  mt-1 "
                  type={showPassword ? "text" : "password"}
                  name="ConfirmPassword"
                  value={formData.ConfirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  id="ConfirmPassword"
                />
                <div
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                  className="absolute right-2 bottom-3 cursor-pointer "
                >
                  {showPassword ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </div>
              </div>
              <p className=" text-red-600"> {error}</p>
              <div>
                <button
                  type="submit"
                  className={`text-white font-semibold bg-colorOne  rounded-lg px-3 py-1 mt-3 uppercase ${
                    loading ? "disabled" : ""
                  }`}
                >
                  SIGN UP
                </button>
              </div>
            </form>
          </div>
          <div className="w-3/4 mx-auto text-colorTwo mt-4">
            <h4 className="text-center  md:text-lg">
              Already have an account?{" "}
              <Link to={"/signin"} className="text-colorOne uppercase">
                sign in
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
