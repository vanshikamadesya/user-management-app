import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";

interface User {
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null; 
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch("https://67c49122c4649b9551b3fc8d.mockapi.io/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token || "mock-token");

      return { user: { email }, token: data.token || "mock-token" }; // Fix the return type
    } catch (error: any) {
      return rejectWithValue(error.message);
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
      localStorage.removeItem("authToken");
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



// interface AuthState {
//   isAuthenticated: boolean;
//   user: { id: string; name: string; email: string; password: string } | null;
// }

// const initialState: AuthState = {
//   isAuthenticated: !!localStorage.getItem("authUser"),
//   user: localStorage.getItem("authUser")
//     ? JSON.parse(localStorage.getItem("authUser") as string)
//     : null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     register: (
//       state,
//       action: PayloadAction<{
//         id: string;
//         name: string;
//         email: string;
//         password: string;
//       }>
//     ) => {
//       state.isAuthenticated = true;
//       state.user = {
//         id: action.payload.id,
//         name: action.payload.name,
//         email: action.payload.email,
//         password: action.payload.password,
//       };
//       localStorage.setItem("authUser", JSON.stringify(state.user));
//     },
//     login: (
//       state,
//       action: PayloadAction<{ password: string; email: string }>
//     ) => {
//       const storedUser = JSON.parse(localStorage.getItem("authUser") as string);

//       if (
//         storedUser &&
//         storedUser.email === action.payload.email &&
//         storedUser.password === action.payload.password
//       ) {
//         state.isAuthenticated = true;
//         state.user = storedUser;
//       } else {
//         alert("Invalid email or password");
//       }
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       localStorage.removeItem("authUser");
//     },
//   },
// });

// export const { register, login, logout } = authSlice.actions;
// export default authSlice.reducer;
