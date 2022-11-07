import { BooleanInput, SimpleForm, TextInput, useCreate } from "react-admin";
import { FormToolbar } from "../Form/FormToolbar";

export const ElementForm = () => {
  // const [create] = useCreate();
  // const postSave = (data: any) => {
  //   create("posts", { data });
  //   window.history.back();
  // };
  return (
    // <SimpleForm toolbar={<FormToolbar />} onSubmit={postSave}>
    <SimpleForm toolbar={<FormToolbar />}>
      ElementForm
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <BooleanInput source="is_active" />
    </SimpleForm>
  );
};
