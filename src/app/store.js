import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users";
import controlerReducer from "../features/controler";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    controler: controlerReducer,
  },
});
