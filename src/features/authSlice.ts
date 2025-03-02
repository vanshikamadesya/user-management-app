import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface User {
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("authToken"), // Check for auth token in localStorage
  user: null,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch("https://67c49122c4649b9551b3fc8d.mockapi.io/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      const token = data.token || "mock-token"; // Use mock-token if no token returned
      localStorage.setItem("authToken", token); // Persist token in localStorage

      return { user: { email }, token }; // Return user and token
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
      }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("authToken"); // Clear auth token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
