import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import popupReducer from "./src/reducers/popupReducer";

export const store = configureStore({
  reducer: {
    popup: popupReducer,
  },
  middleware: [thunkMiddleware],
});
