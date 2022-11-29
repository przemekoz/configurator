import React from "react";
import { SimpleForm } from "react-admin";
import { FormToolbar } from "./FormToolbar";

interface Props {
  isEdit?: boolean;
  children: any;
}
export const FormWrapper = ({ isEdit, children }: Props) => (
  <SimpleForm toolbar={<FormToolbar saveLabel={isEdit ? "UPDATE" : "ADD"} />}>
    {children}
  </SimpleForm>
);
