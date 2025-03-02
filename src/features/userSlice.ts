import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define User Type Before Using It
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  status: boolean;
}

const USERS_KEY = "users";

// Load Users from LocalStorage
const loadUsersFromLocalStorage = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Save Users to LocalStorage
const saveUsersToLocalStorage = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Async Thunk to Simulate API Call
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return new Promise<User[]>((resolve) => {
    setTimeout(() => {
      resolve(loadUsersFromLocalStorage());
    }, 1500); 
  });
});

interface UserState {
  users: User[];
  loading: boolean;
}

const initialState: UserState = {
  users: loadUsersFromLocalStorage(),
  loading: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      saveUsersToLocalStorage(state.users);
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      saveUsersToLocalStorage(state.users);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) state.users[index] = action.payload;
      saveUsersToLocalStorage(state.users);
    },
    deleteUser: (state, action: PayloadAction<string | string[]>) => {
      if (Array.isArray(action.payload)) {
        state.users = state.users.filter(
          (user) => !action.payload.includes(user.id)
        );
      } else {
        state.users = state.users.filter((user) => user.id !== action.payload);
      }
      saveUsersToLocalStorage(state.users);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log("Fetched Users:", action.payload);
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setUsers, addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
