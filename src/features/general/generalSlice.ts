import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ColorMode } from "../../model/color-mode";

export interface GeneralState {
  colorMode: ColorMode;
}

const initialState: GeneralState = {
  colorMode: ColorMode.DARK,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setColorMode: (state, action) => {
      state.colorMode = action.payload;
    },
  },
});

export const { setColorMode } = generalSlice.actions;

export const selectColorMode = (state: RootState) => state.general.colorMode;

export default generalSlice.reducer;
