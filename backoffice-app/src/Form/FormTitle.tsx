import { useRecordContext } from "react-admin";

interface Props {
  name?: string;
  label: string;
}

export const FormTitle = ({ name = "name", label }: Props) => {
  const record = useRecordContext();
  return (
    <span>
      {record ? "Edit" : "Create"} {label}: {record ? record[name] : ""}
    </span>
  );
};
