import { BooleanInput, required, TextInput, useGetRecordId } from "react-admin";
import { GroupEdit } from "../GroupEdit/GroupEdit";
import TextFieldMUI from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormWrapper } from "../Form/FormWrapper";

interface Props {
  saveLabel: string;
  recordId?: any;
}

export const DictionaryForm = ({ recordId = 0, saveLabel }: Props) => (
  <FormWrapper saveLabel={saveLabel}>
    <TextInput disabled source="id" fullWidth />
    <TextInput source="name" fullWidth validate={required()} />

    <Stack direction="row" spacing={1} alignItems="baseline">
      <Typography>One choice</Typography>
      <BooleanInput source="multiple" defaultChecked label="" disabled={recordId} />
      <Typography>Multiple choice</Typography>
    </Stack>

    <GroupEdit source="dictionary_values" foreignKey={recordId}>
      {/* <TextFieldMUI data-field="id" data-label="Id" disabled fullWidth /> */}
      <TextFieldMUI data-field="name" data-label="Name" fullWidth />
    </GroupEdit>
  </FormWrapper>
)
