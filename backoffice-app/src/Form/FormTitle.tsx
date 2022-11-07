import { useRecordContext } from "react-admin";

export const FormTitle = ({ name = "name" }: { name?: string }) => {
  const record = useRecordContext();
  return <span>Edit user: {record ? record[name] : ""}</span>;
};
