import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app-store";
import { useGetViewFromUrl } from "../../../hooks/useGetViewFromUrl";
import { selectFilterArray } from "../filter-selector";

export const FilterPills = () => {
  const view = useGetViewFromUrl();

  const filters = useSelector((state: RootState) =>
    selectFilterArray(state, view)
  );
  return (
    <>
      {filters.map((item: any) =>
        item.values.length
          ? item.values.map((value: string) => (
              <span
                key={value}
                className="badge rounded-pill text-bg-info me-2"
              >
                {item.label}: {value}
              </span>
            ))
          : null
      )}
    </>
  );
};
