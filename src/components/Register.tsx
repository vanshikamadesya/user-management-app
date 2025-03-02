import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../features/authSlice";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();

  return (
    <div className="bg-gradient-to-r from-cyan-800 to-purple-800 text-white justify-center items-center w-full h-screen flex">
      <div>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(2, "Name is too short")
              .required("Name is required"),
            email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
          })}
          onSubmit={(values) => {
            dispatch(register({ id: new Date().toISOString(), ...values }));
          }}
        >
          <Form className="space-y-6 border rounded-md px-9 py-4 mt-11 bg-white border-black">
            <h2 className="text-4xl font-bold tracking-normal text-center text-black">
              Register
            </h2>

            <div>
              <label className="text-black text-lg font-normal mb-3">
                Name:
              </label>
              <Field
                type="text"
                name="name"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 border-black"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="text-black text-lg font-normal mb-3">
                Email:
              </label>
              <Field
                type="email"
                name="email"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 border-black"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="text-black text-lg font-normal mb-3">
                Password:
              </label>
              <Field
                type="password"
                name="password"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 border-black"
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
              Register
            </button>
            <p className="text-center text-black text-sm mt-4">
              Already have an account?{" "}
              <Link to="/" className="text-purple-600 font-bold hover:underline">
                Login
              </Link>
            </p>

          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
