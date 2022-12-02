import React from "react";
import { ElementList } from "../../components/ElementList/ElementList";
import { FilterValue } from "../../const/filterValue";

export const Columns = () => <ElementList filterValue={FilterValue.column} />;
