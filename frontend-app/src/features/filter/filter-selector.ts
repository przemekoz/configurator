import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app-store";
import { ViewWithFilters } from "../../const/viewWithFilters";
import { ValueLabel } from "../../types/valueLabel";
import { FilterItem } from "./filter-store";

export const selectFilterArray = (
  state: RootState,
  view: ViewWithFilters | undefined
) =>
  state.filter.filter
    .filter((item: FilterItem) => item.view === view && item.filterValues.length)
    .map((item: FilterItem) => ({
      label: item.filterLabel,
      values: item.filterValues.map((item: ValueLabel) => item.label),
    }));

export const selectFilter = createSelector(
  (
    state: RootState,
    view: ViewWithFilters | undefined
  ): [FilterItem[], ViewWithFilters | undefined] => [state.filter.filter, view],
  ([state, view]) =>
    state
      .filter((item: FilterItem) => item.view === view && item.filterValues.length)
      .map(
        (item: FilterItem) =>
          `${item.filterCode}:${item.filterValues
            .map((item: ValueLabel) => item.value)
            .join(",")}`
      )
      .join("_amp_")
);
