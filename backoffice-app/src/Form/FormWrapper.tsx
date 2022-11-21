import React, { ReactElement } from "react";
import { SimpleForm } from "react-admin";
import { FormToolbar } from "./FormToolbar";

interface Props {
  saveLabel?: string;
  children: any;
}
export const FormWrapper = ({ saveLabel, children }: Props) => (
  <SimpleForm toolbar={<FormToolbar saveLabel={saveLabel} />}>
    {children}
  </SimpleForm>
);
