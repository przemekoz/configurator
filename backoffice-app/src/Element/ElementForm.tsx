import {
  BooleanInput,
  FormTab,
  required,
  TabbedForm,
  TextInput,
  useGetRecordId,
} from "react-admin";
import { FormToolbar } from "../Form/FormToolbar";
import { PickFromMany } from "../PickFromMany/PickFromMany";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { Request } from "../_helper/request";
import { Endpoint } from "../_const/endpoint";

export const ElementForm = () => {
  const recordId = useGetRecordId();

  const [dictionaries, setDictionaries] = useState<any[]>([]);

  useEffect(() => {
    Request.get(Endpoint.dictionaries).then((response: any) => {
      setDictionaries(response.data);
    });
  }, []);

  return (
    <TabbedForm toolbar={<FormToolbar />}>
      <FormTab label="base">
        <TextInput disabled source="id" label="Id" fullWidth />
        <TextInput source="name" label="Name" fullWidth validate={required()} />
        <BooleanInput source="is_active" />
      </FormTab>
      <FormTab label="relations">
        <Grid container>
          <Grid item>
            {dictionaries.map((dictionary: any) => (
              <PickFromMany
                dictionary_id={dictionary.id}
                element_id={recordId}
                source={Endpoint.dictionaries}
                sourceRelation={Endpoint.dictionary_values}
                saveTo={Endpoint.element_dictionary_values}
              />
            ))}
          </Grid>
        </Grid>
      </FormTab>
    </TabbedForm>
  );
};
