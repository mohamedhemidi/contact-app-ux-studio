import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Data {
  type?: string;
}

interface PopupState {
  active: boolean;
  data: Data;
}
const initialState: PopupState = {
  active: false,
  data: {},
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup: (state, action: PayloadAction<PopupState>) => {
      console.log(state, action);
      state.active = action.payload.active;
      state.data["type"] = action.payload.data.type;
    },
    closePopup: (state) => {
      state.active = false;
      state.data = {};
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
