import {
  Button,
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  SimpleForm,
  TextField,
  TextInput,
  useGetRecordId,
} from "react-admin";
import { FormToolbar } from "../Form/FormToolbar";

export const DictionaryForm = () => {
  const recordId = useGetRecordId();

  return (
    <SimpleForm toolbar={<FormToolbar />}>
      <TextInput disabled source="id" />
      <TextInput source="name" />

      <List
        resource="dictionaries_value"
        exporter={false}
        hasCreate={true}
        filter={{ id_dictionary: recordId }}
      >
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" />
          <EditButton label="" />
          <DeleteButton label="" />
        </Datagrid>
      </List>
    </SimpleForm>
  );
};
