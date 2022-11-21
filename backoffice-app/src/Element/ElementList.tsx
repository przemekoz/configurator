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
      <ImageField source="thumbnailUrl" label="Image" />
      <TextField source="title" label="Title" />
      <BooleanField
        source="is_active"
        label="Available"
        record={{ is_active: true }}
      />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
