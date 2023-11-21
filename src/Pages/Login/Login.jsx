import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import "./Login.css";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { loading, setLoading, userLogin } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email) {
      setError("please fill the name field");
      return;
    }
    if (!formData.password) {
      setError("please fill the password field");
      return;
    }

    console.log(formData.email, formData.password);

    userLogin(formData.email, formData.password)
      .then((data) => {
        if (data.user) {
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        console.log(error.message);

        if (
          error.message === "Firebase: Error (auth/invalid-login-credentials)."
        ) {
          setError("Invalid password!");
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
            src="https://i.ibb.co/688mrnZ/top-view-delicious-food-table-still-life-3.jpg"
            alt=""
          />
        </div>
        <div className="w-1/2 h-full  ">
          <h1 className="text-colorOne text-5xl font-bold  tracking-tighter uppercase">
            sign in
          </h1>

          <div className="space-y-2 w-3/4    mt-20 mx-auto">
            <form autoComplete="off" onSubmit={handleLoginData}>
              <div>
                <label className={labelStyle} htmlFor="email">
                  Email
                </label>
                {/*got input styles moved to index.css file */}
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
                  className=" "
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
              <p className=" text-red-600"> {error}</p>
              <div>
                <button
                  type="submit"
                  className={`text-white font-semibold bg-colorOne  rounded-lg px-3 py-1 mt-3 ${
                    loading && "disabled"
                  }`}
                >
                  SIGN IN
                </button>
              </div>
            </form>
          </div>
          <div className="w-3/4 mx-auto text-colorTwo mt-4">
            <h4 className="text-center text-lg ">
              New to Morsel?{" "}
              <Link to={"/register"} className="text-colorOne uppercase">
                sign up
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

export default Login;
