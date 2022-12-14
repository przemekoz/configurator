import { createSlice } from "@reduxjs/toolkit";
import { ViewWithFilters } from "../../const/viewWithFilters";
import { ValueLabel } from "../../types/valueLabel";

export interface FilterItem {
  view: ViewWithFilters;
  filterCode: string;
  filterLabel: string;
  filterValues: ValueLabel[];
}

export interface FilterState {
  filter: FilterItem[];
}

const initialState: FilterState = {
  filter: [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, param) => {
      const filter = state.filter.filter(
        (item: FilterItem) =>
          item.view !== param.payload.view ||
          item.filterCode !== param.payload.filterCode
      );

      filter.push(param.payload);
      state.filter = filter;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFilter } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
