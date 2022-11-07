import { Edit } from "react-admin";
import { FormTitle } from "../Form/FormTitle";
import { ClientForm } from "./ClientForm";

export const ClientEdit = () => {
  return (
    <Edit title={<FormTitle />}>
      <ClientForm />
    </Edit>
  );
};
