import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../features/store";
import { loginUser } from "../features/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

// Validation Schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error } = useSelector((state: RootState) => state.auth);

  return (
    <div className="bg-gradient-to-r from-cyan-800 to-purple-800 text-white flex justify-center items-center w-full h-screen">
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema} 
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const result = await dispatch(loginUser(values));
              if (loginUser.fulfilled.match(result)) {
                navigate("/dashboard");
              }
            } catch (error) {
              console.error("Login error:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <Form className="space-y-6 border rounded-md px-9 py-4 mt-11 bg-white border-black">
            <h2 className="text-4xl font-bold tracking-normal text-center text-black">
              Login
            </h2>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div>
              <label className="text-black text-lg font-normal">Email: </label>
              <Field
                type="email"
                name="email"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 border-black text-black"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="text-black text-lg font-normal">Password:</label>
              <Field
                type="password"
                name="password"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 border-black text-black"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition"
            >
              Login
            </button>

            <p className="text-center text-black text-sm mt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-purple-600 font-bold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;

// import { login } from "../features/authSlice";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../features/store";
// import * as Yup from "yup";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { Link } from "react-router-dom";

// const Login = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   return (
//     <div className="bg-gradient-to-r from-cyan-800 to-purple-800 text-white justify-center items-center w-full h-screen flex">
//       <div>
//         <Formik
//           initialValues={{ email: "", password: "" }}
//           validationSchema={Yup.object({
//             email: Yup.string()
//               .email("Invalid email")
//               .required("Email is required"),
//             password: Yup.string()
//               .min(6, "Pasword must be 6 character")
//               .required("Password is required"),
//           })}
//           onSubmit={(values) => {
//             dispatch(login(values));
//           }}
//         >
//           <Form className="space-y-6 border rounded-md px-9 py-4 mt-11 bg-white border-black ">
//             <h2 className="text-4xl font-bold tracking-normal text-center text-black ">
//               Login
//             </h2>

//             <div>
//               <label className=" text-black text-lg text-bold mb-3">
//                 Email:{" "}
//               </label>
//               <Field
//                 type="email"
//                 name="email"
//                 className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 border-black"
//               />
//               <ErrorMessage
//                 name="email"
//                 component="p"
//                 className="text-red-500 text-sm"
//               />
//             </div>
//             <div>
//               <label className="text-black text-lg text-bold ">Password:</label>
//               <Field
//                 type="password"
//                 name="password"
//                 className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 border-black"
//               />
//               <ErrorMessage
//                 name="password"
//                 component="p"
//                 className="text-red-500 text-sm"
//               />
//             </div>
//             <div className="flex justify-between text-sm text-purple-500">
//               <a href="#" className="hover:underline">
//                 Forgot Password?
//               </a>
//             </div>

//             <button
//                 type="submit"
//                 className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition"
//               >
//                 Login
//               </button>
//               <p className="text-center text-black text-sm mt-4">
//               Don't have an account?{" "}
//               <Link to="/register" className="text-purple-600 font-bold hover:underline">
//                 Sign Up
//               </Link>
//             </p>

//           </Form>
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default Login;
