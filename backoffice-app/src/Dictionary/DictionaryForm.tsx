import {
  SimpleForm,
  TextInput,
  useGetRecordId,
} from "react-admin";
import { FormToolbar } from "../Form/FormToolbar";
import { GroupEdit } from "../GroupEdit/GroupEdit";
import TextFieldMUI from "@mui/material/TextField";

export const DictionaryForm = () => {
  const recordId = useGetRecordId();

  return (
    <SimpleForm toolbar={<FormToolbar />}>
      <TextInput disabled source="id" />
      <TextInput source="name" />

      <GroupEdit source="dictionary_values" foreignKey={recordId}>
        <TextFieldMUI data-field="id" data-label="Id" disabled />
        <TextFieldMUI data-field="name" data-label="Name" />
      </GroupEdit>

    </SimpleForm>
  );
};
