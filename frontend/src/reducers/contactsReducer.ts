import { createSlice } from "@reduxjs/toolkit";
import {
  addContacts,
  getContacts,
  updateContact,
  viewContact,
} from "../services/contacts.services";
import { Contact } from "../Models/contacts";

export interface ContactState {
  error: string | null;
  loading: boolean;
  list: Contact[];
  contact: Contact | {};
}

const initialState: ContactState = {
  error: "null",
  loading: false,
  list: [],
  contact: {},
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.contacts;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(addContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContacts.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(viewContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload.contact.Item;
      })
      .addCase(viewContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default contactsSlice.reducer;
