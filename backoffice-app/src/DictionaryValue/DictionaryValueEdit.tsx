import { Edit, useUpdate } from "react-admin";
import { FormTitle } from "../Form/FormTitle";
import { DictionaryValueForm } from "./DictionaryValueForm";

export const DictionaryValueEdit = () => {
  const [update] = useUpdate();
  const handleSave = (data: any) => {
    update("dictionary_values", { data });
    window.history.back();
  };
  return (
    <Edit title={<FormTitle />}>
      <DictionaryValueForm onSave={handleSave} />
    </Edit>
  );
};
