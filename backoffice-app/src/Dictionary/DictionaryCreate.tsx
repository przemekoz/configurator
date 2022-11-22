import { useEffect, useState } from "react";
import { Create } from "react-admin";
import { Endpoint } from "../_const/endpoint";
import { DictionaryForm } from "./DictionaryForm";
import { Request } from "../_helper/request";

export const DictionaryCreate = (props: any) => {
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    Request.get(`${Endpoint.dictionaries}/getMaxId`).then((response: any) => {
      console.log(response.data);
      setNextId(response.data.data);
    });
  }, []);

  return (
    <Create {...props} redirect="list">
      <DictionaryForm saveLabel="add new dictionary" nextId={nextId} />
    </Create>
  );
};
