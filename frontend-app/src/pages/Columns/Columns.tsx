import React from "react";
import { ElementList } from "../../components/ElementList/ElementList";
import { PredefinedFilterType } from "../../const/filterValue";

export const Columns = () => (
  <ElementList filterValue={PredefinedFilterType.column} />
);
