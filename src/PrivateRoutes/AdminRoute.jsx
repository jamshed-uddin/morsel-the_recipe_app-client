import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useSingleUser from "../hooks/useSingleUser";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, currentUserLoading } = useSingleUser();

  if (loading || currentUserLoading) {
    return <div className="h-screen bg-bgColor"></div>;
  }

  if (user && currentUser?.role !== "admin") {
    return navigate("/");
  }

  if (user && currentUser?.role === "admin") {
    return children;
  }

  return (
    <Navigate to={"/signin"} state={{ from: location }} replace></Navigate>
  );
};

export default AdminRoute;
