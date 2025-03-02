import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./features/store";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AuthGuard from "./components/AuthGuard";
import Applayout from "./Applayout";
import EditUser from "./components/EditUser";
import AddUser from "./components/AddUser";

const AuthRedirect = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Login />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      { path: "/", element: <AuthRedirect /> }, // Redirect based on authentication

      // Protected Routes
      {
        element: <AuthGuard />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/addUser", element: <AddUser /> },
          { path: "/editUser/:id", element: <EditUser /> },
        ],
      },

      // Redirect unknown routes to Dashboard or Login
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);

export default router;
