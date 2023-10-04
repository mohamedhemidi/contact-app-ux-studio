import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PopupData } from "../Models/popup";

const initialState: PopupData = {
  id: "",
  type: "",
  active: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup: (state, action: PayloadAction<PopupData>) => {
      state.active = true;
      state.id = action.payload.id;
      state.type = action.payload.type;
    },
    closePopup: () => {
      return initialState;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
