import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useSingleUser from "../hooks/useSingleUser";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  const { currentUser, currentUserLoading } = useSingleUser();
  const location = useLocation();
  console.log(currentUserLoading);
  if (loading || currentUserLoading) {
    return <div className="h-screen bg-bgColor"></div>;
  }

  if (user && currentUser?.role === "admin") {
    return children;
  }

  return <Navigate to={"/"} state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
