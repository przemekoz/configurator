import { Create } from "react-admin";
import { ElementForm } from "./ElementForm";

export const ElementCreate = (props: any) => (
  <Create {...props} redirect="list">
    <ElementForm />
  </Create>
);
