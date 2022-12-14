import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetViewFromUrl } from "../../../hooks/useGetViewFromUrl";
import { useLoadAsyncData } from "../../../hooks/useLoadAsyncData";
import { FiltersDefinition } from "../../../types/filtersDefinition";
import { ValueLabel } from "../../../types/valueLabel";
import { filtersResponse } from "../../../_to_remove/mock-data";
import { setFilter } from "../filter-store";
import { FilterMultiple } from "./FilterMultiple";
import { FilterSingle } from "./FilterSingle";

export const Filters = () => {
  const view = useGetViewFromUrl();
  const type = useGetViewFromUrl();
  const [filters, setFilters] = useState<FiltersDefinition[]>([]);
  const dispatch = useDispatch();

  const load = useLoadAsyncData(
    (response) => {
      setFilters(response);
    },
    () => {
      //no action
      setFilters(filtersResponse);
    }
  );

  useEffect(() => {
    load(`someUrl?type=${type}`);
  }, []);

  const handleSave = (data: ValueLabel[], code: string, label: string) => {
    dispatch(
      setFilter({
        view,
        filterCode: code,
        filterLabel: label,
        filterValues: data,
      })
    );
  };

  return (
    <div className="filters d-flex" style={{ gap: "0.5em" }}>
      {filters.map((item: FiltersDefinition) =>
        item.multiple ? (
          <FilterMultiple
            key={item.id}
            options={item.options}
            label={item.name}
            code={item.code}
            onSave={handleSave}
          />
        ) : (
          <FilterSingle
            key={item.id}
            options={item.options}
            label={item.name}
            code={item.code}
            onSave={handleSave}
          />
        )
      )}
    </div>
  );
};
