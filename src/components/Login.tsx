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
    <div className="bg-gradient-to-br from-[#9eb1e1] via-[#afdaee] to-[#f0f4f8] flex justify-center items-center w-full h-screen">
      <div className="backdrop-blur-md bg-white/60 border border-white/40 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        <p className="text-center text-sm text-gray-600 mt-2">Access your account</p>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

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
          <Form className="space-y-5 mt-4">
            <div>
              <label className="text-gray-700 text-lg font-medium">Email:</label>
              <Field
                type="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-lg bg-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-500"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="text-gray-700 text-lg font-medium">Password:</label>
              <Field
                type="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-lg bg-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-500"
                placeholder="••••••••"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-blue-500/50"
            >
              Login
            </button>

            <p className="text-center text-gray-600 text-sm mt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-500 font-bold hover:underline"
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
