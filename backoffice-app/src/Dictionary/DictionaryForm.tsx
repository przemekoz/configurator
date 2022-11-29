import {
  required,
  TextInput,
  BooleanInput,
  useRecordContext,
} from "react-admin";
import { GroupEdit } from "../GroupEdit/GroupEdit";
import TextFieldMUI from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormWrapper } from "../Form/FormWrapper";

interface Props {
  nextId?: number;
}

export const DictionaryForm = ({ nextId }: Props) => {
  const record = useRecordContext();

  // @TODO @FIXME - if will be more than one user nextId + userId
  const nextInsertId = nextId ? nextId + 1 : undefined;

  return (
    <FormWrapper isEdit={Boolean(record)}>
      <TextInput disabled source="id" fullWidth />
      <TextInput source="name" fullWidth validate={required()} />
      <BooleanInput source="is_active" />

      {record && record.id === 0 && (
        <Stack direction="row" spacing={1} alignItems="baseline">
          <Typography>Single choice</Typography>
          <BooleanInput source="multiple" label="" />
          <Typography>Multiple choice</Typography>
        </Stack>
      )}

      {record && record.id > 0 && (
        <Typography my={1}>
          {Boolean(record.multiple) ? "Multiple" : "Single"} choice dictionary
        </Typography>
      )}

      <GroupEdit
        source="dictionary_values"
        foreignKey={record ? record.id : nextInsertId}
      >
        {/* <TextFieldMUI data-field="id" data-label="Id" disabled fullWidth /> */}
        <TextFieldMUI data-field="name" data-label="Value" fullWidth />
      </GroupEdit>
    </FormWrapper>
  );
};
