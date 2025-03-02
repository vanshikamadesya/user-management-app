import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AuthGuard from "./components/AuthGuard";
import Applayout from "./Applayout";
import EditUser from "./components/EditUser";
import AddUser from "./components/AddUser";

// const router = createBrowserRouter([
  
//   {
//     path: "/",
//     element: <Applayout />,
//     children: [
//       {path: "/" , element:<Login/>},
//       { path: "/register", element: <Register /> },
//       { path: "/dashboard", element: <Dashboard /> },
//       {
//         path: "/addUser",
//         element: <AddUser/>
//       },
//       {
//         path: "/editUser/:id",
//         element: <EditUser/>
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      { path: "/", element: <Login /> },

      // Protected Routes
      {
        element: <AuthGuard />, 
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/addUser", element: <AddUser /> },
          { path: "/editUser/:id", element: <EditUser /> },
        ],
      },
    ],
  },
]);

export default router;
