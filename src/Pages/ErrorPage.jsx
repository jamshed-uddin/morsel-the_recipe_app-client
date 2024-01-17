import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen text-colorOne text-center">
      <div>
        <h1 className=" text-[10rem] leading-[7rem] font-semibold ">404</h1>
        <div className="text-4xl lg:flex items-center  divide-x-2 divide-colorOne">
          <h1 className="px-4">Page not found</h1>
          <p className="px-4">
            <Link to={"/"}>Get back</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
