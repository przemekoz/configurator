import {
  BooleanField,
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  TextField,
} from "react-admin";

export const ElementList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <BooleanField source="is_active" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
