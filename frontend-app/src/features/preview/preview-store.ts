import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app-store";

export interface PreviewState {
  preview: boolean;
}

const initialState: PreviewState = {
  preview: false,
};

export const PreviewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    showPreview: (state) => {
      state.preview = true;
    },
    hidePreview: (state) => {
      state.preview = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showPreview, hidePreview } = PreviewSlice.actions;

export const selectPreview = (state: RootState) => state.preview;

export const PreviewReducer = PreviewSlice.reducer;
