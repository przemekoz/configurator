import {
  Button,
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  ReferenceArrayField,
  ReferenceManyField,
  SimpleForm,
  TextField,
  TextInput,
  useGetRecordId,
} from "react-admin";
import { DictionaryValueList } from "../DictionaryValue/DictionaryValueList";
import { FormToolbar } from "../Form/FormToolbar";

export const DictionaryForm = () => {
  const recordId = useGetRecordId();

  return (
    <SimpleForm toolbar={<FormToolbar />}>
      <TextInput disabled source="id" />
      <TextInput source="name" />

      <DictionaryValueList id_dictionary={recordId} />

      {/* <ReferenceManyField reference="dictionary_values" target="dictionary_id">
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                    
                </Datagrid>
            </ReferenceManyField>

            <ReferenceArrayField reference="dictionary_values" source="dictionary_id">
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                    
                </Datagrid>
            </ReferenceArrayField> */}

    </SimpleForm>
  );
};
