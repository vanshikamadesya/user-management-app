import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default AuthGuard;
