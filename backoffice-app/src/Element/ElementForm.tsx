import {
  BooleanInput,
  FormTab,
  ImageField,
  ImageInput,
  required,
  TabbedForm,
  TextInput,
  useGetRecordId,
} from "react-admin";
import { FormToolbar } from "../Form/FormToolbar";
import { PickFromMany } from "../PickFromMany/PickFromMany";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { Http } from "../_helper/http";
import { Endpoint } from "../_const/endpoint";

interface Props {
  saveLabel: string;
}

export const ElementForm = ({ saveLabel }: Props) => {
  const recordId = useGetRecordId();

  const [dictionaries, setDictionaries] = useState<any[]>([]);

  useEffect(() => {
    Http.get(
      `${Endpoint.dictionaries}?size=10&page=0&sortField=name&sortDir=asc`
    ).then((response: any) => {
      setDictionaries(response.data.data);
    });
  }, []);

  return (
    <TabbedForm toolbar={<FormToolbar saveLabel={saveLabel} />}>
      <FormTab label="base">
        <TextInput disabled source="id" label="Id" fullWidth />
        <TextInput source="name" label="Name" fullWidth validate={required()} />
        <BooleanInput source="is_active" />
        <Grid container>
          <Grid item>
            <ImageField source="thumbnailUrl" label="Image" />
          </Grid>
          <Grid item>
            <ImageInput source="thumbnailUrl" label="Add/change image" />
          </Grid>
        </Grid>
      </FormTab>
      <FormTab label="relations">
        <Grid container spacing={3}>
          {dictionaries.map((dictionary: any) => (
            <Grid item>
              <PickFromMany
                multiple={dictionary.multiple}
                label={dictionary.name}
                dictionary_id={dictionary.id}
                element_id={recordId}
                sourceRelation={Endpoint.dictionary_values}
                saveTo={Endpoint.element_dictionary_values}
              />
            </Grid>
          ))}
        </Grid>
      </FormTab>
    </TabbedForm>
  );
};
