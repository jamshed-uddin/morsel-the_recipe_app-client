import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import "./Registration.css";
import { Link } from "react-router-dom";

import useAuthContext from "../../hooks/useAuthContext";

const Registration = () => {
  const { loading, setLoading, registerUser } = useAuthContext();
  console.log(loading);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    ConfirmPassword: "",
  });

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
      setError("Please fill the name field");
      return;
    }
    if (!formData.email) {
      setError("Please fill the email field");
      return;
    }
    if (!formData.password) {
      setError("Please fill the password field");
      return;
    }
    if (!formData.ConfirmPassword) {
      setError("Please retype the password");
      return;
    }
    if (formData.password !== formData.ConfirmPassword) {
      setError("Password does not match");
      return;
    }

    console.log(formData.name, formData.email, formData.password);
    registerUser(formData.email, formData.password)
      .then((data) => {
        if (data.user) console.log(data.user);
        console.log("user created successfully");
        //TODO: redirect to the required page
      })
      .catch((error) => {
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
    <div className="h-screen flex items-center justify-center my-container">
      <div className=" w-4/5 h-4/5  mx-auto flex   rounded-2xl overflow-hidden shadow-lg">
        <div className="w-1/2 h-full">
          <img
            className="object-cover w-full h-full"
            src="https://i.ibb.co/dJb4HYw/top-view-delicious-food-table-still-life-2.jpg"
            alt=""
          />
        </div>
        <div className="w-1/2 h-full  overflow-y-auto ">
          {/* Title text not button */}
          <h1 className="text-colorOne text-5xl font-bold leading-8 tracking-tighter uppercase ">
            sign up
          </h1>

          <div className="space-y-2 w-3/4    mt-12 mx-auto">
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
            <h4 className="text-center text-lg">
              Already have an account?{" "}
              <Link to={"/signin"} className="text-colorOne uppercase">
                sign in
              </Link>
            </h4>
            <h1 className="text-center text-2xl or">Or</h1>
            <h4 className="text-center text-lg">Continue with</h4>
            <div className="space-x-6 flex items-center justify-center py-2">
              <div>
                <FacebookOutlinedIcon />
              </div>
              <div>
                <GoogleIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
