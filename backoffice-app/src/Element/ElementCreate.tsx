import { Create } from "react-admin";
import { ElementForm } from "./ElementForm";

export const ElementCreate = () => (
  <Create redirect="list">
    <ElementForm />
  </Create>
);
