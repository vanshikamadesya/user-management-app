import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../features/store";
import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { logout } from "../features/authSlice"; 

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
  };

  return (
    <div className="max-w-8xl shadow-md rounded-md py-6 px-12">
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">UserManagement</h1>

        {/* Show Admin + Logout button only if authenticated */}
        {isAuthenticated && (
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <PersonIcon className="text-gray-700 w-6 h-6 " />
              <span className="text-gray-700 font-medium">Admin</span>
            </div>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
