import { Create, useCreate } from "react-admin";
import { DictionaryValueForm } from "./DictionaryValueForm";

export const DictionaryValueCreate = (props: any) => {
  const [create] = useCreate();
  const handleSave = (data: any) => {
    create("dictionary_values", { data });
    window.history.back();
  };

  return (
    <Create {...props}>
      <DictionaryValueForm onSave={handleSave} />
    </Create>
  );
};
