import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  newUser: "",
  selectedUser: "",
  selectedUserRepos: [],
};

const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload;
    },
    getNewUser: (state, action) => {
      state.newUser = action.payload;
    },
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    getSelectedUserRepos: (state, action) => {
      state.selectedUserRepos = action.payload;
    },
  },
});

export const { getUsers, getNewUser, selectUser, getSelectedUserRepos } = users.actions;

export default users.reducer;
