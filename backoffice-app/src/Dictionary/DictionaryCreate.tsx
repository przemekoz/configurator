import { useEffect, useState } from "react";
import { Create } from "react-admin";
import { Endpoint } from "../_const/endpoint";
import { DictionaryForm } from "./DictionaryForm";
import { Http } from "../_helper/http";

export const DictionaryCreate = (props: any) => {
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    Http.get(`${Endpoint.dictionaries}/getMaxId`).then((response: any) => {
      setNextId(response.data.data);
    });
  }, []);

  return (
    <Create {...props} redirect="list">
      <DictionaryForm nextId={nextId} />
    </Create>
  );
};
