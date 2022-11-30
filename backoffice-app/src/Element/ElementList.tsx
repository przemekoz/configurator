import {
  BooleanField,
  Datagrid,
  DeleteButton,
  EditButton,
  ImageField,
  List,
  TextField,
} from "react-admin";

export const ElementList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="Id" />
      <ImageField source="thumbnail" label="Image" />
      <TextField source="name" label="Title" />
      <BooleanField source="is_active" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
