import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorSearch: false,
  errorRepos: false,
  loading: true,
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setErrorSearch, setErrorRepos, setLoading } = controler.actions;

export default controler.reducer;
