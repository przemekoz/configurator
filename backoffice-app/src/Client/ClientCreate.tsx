import { Create } from "react-admin";
import { ClientForm } from "./ClientForm";

export const ClientCreate = (props: any) => (
  <Create {...props} redirect="list">
    <ClientForm />
  </Create>
);
