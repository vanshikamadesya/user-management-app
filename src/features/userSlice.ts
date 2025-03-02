import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  status: boolean;
}

interface UserState {
  users: User[];
  loading: boolean;
}

const loadUsersFromLocalStorage = (): User[] => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

const saveUsersToLocalStorage = (users: User[]) => {
  localStorage.setItem("users", JSON.stringify(users));
};

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
});

export const { setUsers, addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
