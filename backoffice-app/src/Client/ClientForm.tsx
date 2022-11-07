import { BooleanInput, NumberInput, SimpleForm, TextInput } from "react-admin";
import { FormToolbar } from "../Form/FormToolbar";

export const ClientForm = () => (
  <SimpleForm toolbar={<FormToolbar />}>
    <TextInput disabled source="id" />
    <TextInput source="name" />
    <TextInput source="email" />
    <NumberInput source="discount" />
    <BooleanInput source="is_active" />
  </SimpleForm>
);
