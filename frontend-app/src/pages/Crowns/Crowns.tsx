import React from "react";
import { ElementList } from "../../components/ElementList/ElementList";
import { PredefinedFilterType } from "../../const/filterValue";

export const Crowns = () => (
  <ElementList filterValue={PredefinedFilterType.crown} />
);
