import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, RadioGroup, Flex, Switch, IconButton } from "@radix-ui/themes";
import { BsPaperclip } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  updateUser } from "../features/userSlice";
import { AppDispatch, RootState } from "../features/store";
import { User } from "../features/type";

interface UserProp {
  userId?: string;
  onSubmit: (values: User) => void;
  onClose: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  role: Yup.string().required("Role is required"),
  dob: Yup.string().required("Date of birth is required"),
  status: Yup.boolean(),
});

const UserForm: React.FC<UserProp> = ({ userId, onSubmit, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Fetch user data for editing
  const user = useSelector((state: RootState) =>
    state.user.users.find((u) => u.id === userId)
  );

  const initialValues: User = user
    ? { ...user }
    : {
        id: String(Date.now()),
        name: "",
        email: "",
        password: "",
        role: "",
        status: false,
        dob: "",
        gender: "",
      };

  // Function to handle updating an existing user
  const handleEditUser = (values: User) => {
    const updatedUser = {
      ...values,   

    };
    dispatch(updateUser(updatedUser));
    toast.success("User updated successfully!");
  };

  return (
    <div className="w-full h-screen bg-blue-200 flex flex-col items-center p-6 py-8 relative">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          if (userId) {
            handleEditUser(values);
          }
          onSubmit(values);
          resetForm();
          onClose();
          navigate("/dashboard");
        }}
      >
        {({ values, setFieldValue }) => (
          <div className="w-full min-h-[90vh] bg-white shadow-lg border rounded-md px-7 py-16 ">
            <IconButton
              className="absolute top-12 right-10 bg-transparent"
              onClick={onClose}
            >
              <IoClose size={24} className="text-gray-800" />
            </IconButton>

            <h1 className="font-semibold text-2xl mb-7 text-blue-500">
              {userId ? "Edit User" : "Create Admin User"}
            </h1>

            <Form className="grid grid-cols-2 gap-8">
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name*"
                  className="p-2 border rounded-md w-full border-blue-400 placeholder-blue-500"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email*"
                  className="p-2 border rounded-md w-full border-blue-400 placeholder-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password*"
                  className="p-2 border rounded-md w-full border-blue-400 placeholder-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <Field
                  as="select"
                  name="role"
                  className="p-2 border rounded-md w-full border-blue-400"
                >
                  <option value="" className="text-blue-400 ">Role*</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Staff">Staff</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  type="date"
                  name="dob"
                  className="p-2 border rounded-md w-full border-blue-400  "
                />
                <ErrorMessage
                  name="dob"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* File Upload */}
              <div className="flex items-center border p-2 rounded-md border-blue-400">
                <BsPaperclip className="mr-2" />
                <input
                  type="file"
                  onChange={(event) =>
                    setFieldValue(
                      "profile",
                      event.currentTarget.files?.[0] || null
                    )
                  }
                />
              </div>

              {/* Gender Selection */}
              <div>
                <label className="block text-gray-700 mb-1 ">Gender</label>
                <RadioGroup.Root
                  className="flex items-center space-x-4"
                  value={values.gender}
                  onValueChange={(value) => setFieldValue("gender", value)}
                >
                  <div className=" gap-8 mr-auto mt-2">
                    <RadioGroup.Root defaultValue="1" name="example">
                      <RadioGroup.Item value="1">Female</RadioGroup.Item>
                      <RadioGroup.Item value="2">Male</RadioGroup.Item>
                    </RadioGroup.Root>
                  </div>
                </RadioGroup.Root>
              </div>

              {/* Status Toggle */}
              <div>
                <label className="block text-gray-700 mb-1">Status</label>
                <Flex align="center" gap="2">
                  <Switch
                    checked={values.status}
                    onCheckedChange={(value) => setFieldValue("status", value)}
                  />
                  <span>{values.status ? "Active" : "Inactive"}</span>
                </Flex>
              </div>

              {/* Submit Button */}
              <div className="col-span-2 flex  justify-center mt-9">
                <Button type="submit" className="text-lg px-5 py-5">
                  {userId ? "Update User" : "Create User"}
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
