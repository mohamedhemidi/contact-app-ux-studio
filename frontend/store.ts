import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import popupReducer from "./src/reducers/popupReducer";
import contactsReducer from "./src/reducers/contactsReducer";

export const store = configureStore({
  reducer: {
    popup: popupReducer,
    contacts: contactsReducer,
  },
  middleware: [thunkMiddleware],
});
