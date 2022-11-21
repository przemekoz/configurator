import { Edit, useGetRecordId } from "react-admin";
import { FormTitle } from "../Form/FormTitle";
import { DictionaryForm } from "./DictionaryForm";

export const DictionaryEdit = () => {
  const recordId = useGetRecordId();
  return (
    <Edit title={<FormTitle label="dictionary" />}>
      <DictionaryForm recordId={recordId} saveLabel="update dictionary" />
    </Edit>
  );
} 
