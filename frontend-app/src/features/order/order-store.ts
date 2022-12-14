import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app-store";

export interface OrderState {
  order: string;
}

const initialState: OrderState = {
  order: "creationDate,desc",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, param) => {
      state.order = param.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrder } = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order;

export const orderReducer = orderSlice.reducer;
