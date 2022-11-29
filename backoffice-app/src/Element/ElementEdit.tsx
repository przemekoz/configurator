import { Edit } from "react-admin";
import { FormTitle } from "../Form/FormTitle";
import { ElementForm } from "./ElementForm";

export const ElementEdit = () => (
  <Edit title={<FormTitle label="element" />}>
    <ElementForm />
  </Edit>
);
