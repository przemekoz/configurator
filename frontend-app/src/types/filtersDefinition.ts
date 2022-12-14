import { ValueLabel } from "./valueLabel";

export type FiltersDefinition = {
  id: number;
  name: string;
  code: string;
  multiple: boolean;
  options: ValueLabel[];
};
