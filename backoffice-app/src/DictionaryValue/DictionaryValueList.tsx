import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  TextField,
} from "react-admin";

interface Props {
  id_dictionary: number | string;
}

export const DictionaryValueList = ({ id_dictionary }: Props) => (
  <List resource="dictionary_values" filter={{ id_dictionary }}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <EditButton label="" />
      <DeleteButton label="" />
    </Datagrid>
  </List>
);
