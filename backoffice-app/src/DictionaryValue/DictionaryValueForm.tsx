import { SimpleForm, TextInput } from "react-admin";
import { FormToolbar } from "../Form/FormToolbar";

interface Props {
  onSave: any
}

export const DictionaryValueForm = ({onSave}:Props) => {
  return (
    <SimpleForm toolbar={<FormToolbar />} onSubmit={onSave}>
      <TextInput disabled source="id" />
      <TextInput disabled source="id_dictionary" />
      <TextInput source="name" />
    </SimpleForm>
  );
};
