import UserForm from "./UserForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice";
import { AppDispatch } from "../features/store";
import { User } from "../features/type";
import { useState } from "react";
import { toast } from "react-toastify";

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values: User) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    const newUser = { ...values, id: String(Date.now()) };

    dispatch(addUser(newUser)); // Only one Redux dispatch
    toast.success("User added successfully!");
    navigate("/dashboard");

    setTimeout(() => setIsSubmitting(false), 500);
  };

  return (
    <UserForm
      userId={undefined}
      onSubmit={handleSubmit}
      onClose={() => navigate("/dashboard")}
    />
  );
};

export default AddUser;
