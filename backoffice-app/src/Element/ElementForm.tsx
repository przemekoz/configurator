import { BooleanInput, SimpleForm, TextInput, useCreate, useGetRecordId } from "react-admin";
import { FormToolbar } from "../Form/FormToolbar";

export const ElementForm = () => {
  const recordId = useGetRecordId();
  // const [create] = useCreate();
  // const postSave = (data: any) => {
  //   create("posts", { data });
  //   window.history.back();
  // };
  return (
    
    <SimpleForm toolbar={<FormToolbar />}>
      ElementForm
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <BooleanInput source="is_active" />

{/* <PickFromMany
        id={recordId}
        source="dictionaries"
        sourceRelation="dictionary_values"
        saveTo="element_dictionary_values"
      /> */}



    </SimpleForm>
  );
};
