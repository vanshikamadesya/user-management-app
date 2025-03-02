import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import UserForm from "../components/UserForm";

const EditUser = () => {
  const { id } = useParams(); // Get userId from URL
  const navigate = useNavigate();

  // Fetch user from Redux store based on id
  const user = useSelector((state: RootState) =>
    state.user.users.find((u) => u.id === id)
  );

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <UserForm
      userId={user.id}
      onSubmit={() => navigate("/dashboard")} 
      onClose={() => navigate("/dashboard")}
    />
  );
};

export default EditUser;
