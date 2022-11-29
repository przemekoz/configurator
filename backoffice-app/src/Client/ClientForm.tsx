import {
  BooleanInput,
  email,
  NumberInput,
  required,
  TextInput,
  useRecordContext,
} from "react-admin";
import { FormWrapper } from "../Form/FormWrapper";

export const ClientForm = () => {
  const record = useRecordContext();
  return (
    <FormWrapper isEdit={Boolean(record)}>
      <TextInput disabled source="id" fullWidth />
      <TextInput source="name" fullWidth validate={required()} />
      <TextInput source="email" fullWidth validate={email()} />
      <NumberInput source="discount" fullWidth />
      <BooleanInput source="is_active" />
    </FormWrapper>
  );
};
