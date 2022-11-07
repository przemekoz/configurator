import { Create } from "react-admin";
import { DictionaryForm } from "./DictionaryForm";

export const DictionaryCreate = (props: any) => (
  <Create {...props} redirect="list">
    <DictionaryForm />
  </Create>
);
