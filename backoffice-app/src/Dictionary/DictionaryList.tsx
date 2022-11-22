import {
  BooleanField,
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  TextField,
} from "react-admin";

export const DictionaryList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <BooleanField source="is_active" />
      <BooleanField source="multiple" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
