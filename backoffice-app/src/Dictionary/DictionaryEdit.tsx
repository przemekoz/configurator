import { Edit } from "react-admin";
import { FormTitle } from "../Form/FormTitle";
import { DictionaryForm } from "./DictionaryForm";

export const DictionaryEdit = () => (
  <Edit title={<FormTitle label="dictionary" />}>
    <DictionaryForm />
  </Edit>
);
