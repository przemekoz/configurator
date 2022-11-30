import React from "react";
import {
  BooleanField,
  Datagrid,
  EditButton,
  List,
  ReferenceField,
  TextField,
} from "react-admin";
import { Endpoint } from "../_const/endpoint";
import { DeleteButton } from "./DeleteButton";

export const DictionaryList = () => (
  <List>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="id" />
      <TextField source="name" />
      <BooleanField source="is_active" />
      <BooleanField source="multiple" />
      <TextField source="values" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
