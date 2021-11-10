import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorSearch: false,
  errorRepos: false,
};

const controler = createSlice({
  name: "controler",
  initialState,
  reducers: {
    setErrorSearch: (state, action) => {
      state.errorSearch = action.payload;
    },
    setErrorRepos: (state, action) => {
      state.errorRepos = action.payload;
    },
  },
});

export const { setErrorSearch, setErrorRepos } = controler.actions;

export default controler.reducer;
