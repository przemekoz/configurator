import { BooleanInput, NumberInput, required, TextInput } from "react-admin";
import { FormWrapper } from "../Form/FormWrapper";

interface Props {
  saveLabel: string;
}

export const ClientForm = ({ saveLabel }: Props) => (
  <FormWrapper saveLabel={saveLabel}>
    <TextInput disabled source="id" fullWidth />
    <TextInput source="name" fullWidth validate={required()} />
    <TextInput source="email" fullWidth />
    <NumberInput source="discount" fullWidth />
    <BooleanInput source="is_active" defaultChecked />
  </FormWrapper>
);
