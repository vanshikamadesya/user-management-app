import axios from "axios";
import { AppDispatch } from "../features/store";
import { loginSuccess } from "../features/authSlice";

export const login = (userData: { email: string; password: string }) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { email, password } = userData;

      const response = await axios.post(
        "https://interview.optimavaluepro.com/api/v1/auth/login",
        { email, password }
      );

      dispatch(loginSuccess(response.data)); // Dispatch success action
    } catch  {
      alert("Invalid email or password");
    }
  };
};
