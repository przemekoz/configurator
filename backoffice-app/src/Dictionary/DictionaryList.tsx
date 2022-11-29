import React from "react";
import {
  BooleanField,
  Datagrid,
  EditButton,
  List,
  TextField,
} from "react-admin";
import { DeleteButton } from "./DeleteButton";

export const DictionaryList = () => (
  <List>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="id" />
      <TextField source="name" />
      <BooleanField source="is_active" />
      <BooleanField source="multiple" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
