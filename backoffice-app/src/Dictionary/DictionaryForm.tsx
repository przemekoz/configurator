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
import Divider from "@mui/material/Divider";

interface Props {
  saveLabel: string;
  recordId?: any;
  nextId?: number;
}

export const DictionaryForm = ({ recordId = 0, saveLabel, nextId }: Props) => {
  const record = useRecordContext();

  console.log(recordId, nextId);

  // @TODO @FIXME - if will be more than one user nextId + userId
  const nextInsertId = nextId ? nextId + 1 : undefined;

  return (
    <FormWrapper saveLabel={saveLabel}>
      <TextInput disabled source="id" fullWidth />
      <TextInput source="name" fullWidth validate={required()} />
      <BooleanInput source="is_active" defaultChecked />

      {recordId === 0 && (
        <Stack direction="row" spacing={1} alignItems="baseline">
          <Typography>Single choice</Typography>
          <BooleanInput source="multiple" defaultChecked label="" />
          <Typography>Multiple choice</Typography>
        </Stack>
      )}

      {recordId > 0 && (
        <Typography my={1}>
          {Boolean(record.multiple) ? "Multiple" : "Single"} choice dictionary
          <Divider />
        </Typography>
      )}

      <GroupEdit
        source="dictionary_values"
        foreignKey={recordId || nextInsertId}
      >
        {/* <TextFieldMUI data-field="id" data-label="Id" disabled fullWidth /> */}
        <TextFieldMUI data-field="name" data-label="Name" fullWidth />
      </GroupEdit>
    </FormWrapper>
  );
};
