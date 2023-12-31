import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return <div className="h-screen bg-bgColor"></div>;
  }

  if (user) {
    return children;
  }

  return (
    <Navigate to={"/signin"} state={{ from: location }} replace></Navigate>
  );
};

export default PrivateRoute;
