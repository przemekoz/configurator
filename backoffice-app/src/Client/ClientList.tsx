import {
  BooleanField,
  Datagrid,
  DeleteButton,
  EditButton,
  EmailField,
  List,
  TextField,
} from "react-admin";

export const ClientList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="discount" />
      <BooleanField source="is_active" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
