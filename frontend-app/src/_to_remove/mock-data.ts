import { FiltersDefinition } from "../types/filtersDefinition";

export const elements = [
  {
    name: "test 1",
    image: "https://via.placeholder.com/200x300",
    thumbnail: "https://via.placeholder.com/80x100",
  },
  {
    name: "test 2",
    image: "https://via.placeholder.com/200x300",
    thumbnail: "https://via.placeholder.com/80x100",
  },
  {
    name: "test 3",
    image: "https://via.placeholder.com/200x300",
    thumbnail: "https://via.placeholder.com/80x100",
  },
  {
    name: "test 4",
    image: "https://via.placeholder.com/200x300",
    thumbnail: "https://via.placeholder.com/80x100",
  },
  {
    name: "test 5",
    image: "https://via.placeholder.com/200x300",
    thumbnail: "https://via.placeholder.com/80x100",
  },
  {
    name: "test 6",
    image: "https://via.placeholder.com/200x300",
    thumbnail: "https://via.placeholder.com/80x100",
  },
];

export const filtersResponse: FiltersDefinition[] = [
  {
    id: 1,
    name: "Type",
    code: "type",
    multiple: false,
    options: [
      { label: "Type 1", value: "type_1" },
      { label: "Type 2", value: "type_2" },
    ],
  },
  {
    id: 2,
    name: "Material",
    code: "material",
    multiple: true,
    options: [
      { label: "Material 1", value: "material_1" },
      { label: "Material 2", value: "material_2" },
      { label: "Material 3", value: "material_3" },
    ],
  },
];
