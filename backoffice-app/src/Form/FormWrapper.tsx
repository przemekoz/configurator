import React from "react";
import { SimpleForm } from "react-admin";
import { FormToolbar } from "./FormToolbar";

interface Props {
  isEdit?: boolean;
  children: any;
  defaultValues?: any;
}
export const FormWrapper = ({ isEdit, children, defaultValues }: Props) => (
  <SimpleForm
    toolbar={<FormToolbar saveLabel={isEdit ? "UPDATE" : "ADD"} />}
    defaultValues={defaultValues}
  >
    {children}
  </SimpleForm>
);
