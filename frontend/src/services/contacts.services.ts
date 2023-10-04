import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PATH } from "../constants/environements";

export const getContacts = createAsyncThunk(
  "contacts/getContacts",
  async () => {
    const response = await axios.get(PATH.getContacts);
    return response.data;
  }
);

export const addContacts = createAsyncThunk(
  "contacts/addContacts",
  async (body: any) => {
    const response = await axios.post(PATH.addContacts, body);
    return response.data;
  }
);
export const viewContact = createAsyncThunk(
  "contacts/viewContact",
  async (id: string) => {
    const response = await axios.get(`${PATH.viewContact}/${id}`);
    return response.data;
  }
);
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (data: any) => {
    const response = await axios.post(
      `${PATH.updateContact}/${data.id}`,
      data.formData
    );
    return response.data;
  }
);
