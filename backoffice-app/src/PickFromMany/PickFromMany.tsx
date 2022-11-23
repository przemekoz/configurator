import React, { useEffect, useState } from "react";
import { Button } from "react-admin";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ClearIcon from "@mui/icons-material/Clear";
import { Request } from "../_helper/request";
import { Chip } from "./Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export interface Props {
  dictionary_id: number | string;
  element_id: number | string;
  sourceRelation: string;
  saveTo: string;
  label: string;
  multiple: boolean;
}
// getAllEntries
export const PickFromMany = ({
  element_id,
  sourceRelation,
  saveTo,
  dictionary_id,
  label,
  multiple,
}: Props) => {
  const [sourceRelationData, setSourceRelationData] = useState<any[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  const queryString = `element_id=${element_id}&dictionary_id=${dictionary_id}`;

  useEffect(() => {
    Request.get(`${sourceRelation}/${dictionary_id}`).then((result: any) => {
      setSourceRelationData(result.data.data);
    });
    Request.get(`${saveTo}/getAllEntries?${queryString}`).then(
      (result: any) => {
        setSelectedOptions(result.data.data.data);
      }
    );
  }, [setSourceRelationData, setSelectedOptions]);

  const saveValues = (values: any) => {
    const data = Array.isArray(values)
      ? values.map((item: any) => item.id)
      : [values.id];
    Request.post(`${saveTo}/saveValues?${queryString}`, data);
  };

  const handleChange = (event: SelectChangeEvent<typeof selectedOptions>) => {
    const value = event.target.value;
    // On autofill we get a stringified value.
    const newValues = typeof value === "string" ? value.split(",") : value;
    setSelectedOptions(newValues);
    saveValues(newValues);
  };

  const handleDelete = (index: number) => () => {
    const newValues = [...selectedOptions];
    newValues.splice(index, 1);
    setSelectedOptions(newValues);
    saveValues(newValues);
  };

  const handleRemoveAll = () => {
    setSelectedOptions([]);
    saveValues([]);
  };

  console.log(selectedOptions);

  if (!sourceRelationData.length) {
    return null;
  }

  return (
    <div className="pick-from-many">
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <FormControl sx={{ m: 0, width: 400 }}>
            <InputLabel className="label-multi-select">{label}</InputLabel>
            <Select
              autoWidth
              multiple={multiple}
              value={selectedOptions}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label={label} />}
              renderValue={(selected: any) => {
                console.log(selected);
                if (Array.isArray(selected)) {
                  return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value: any, index: number) => (
                        <Chip
                          key={value.id}
                          label={value.name}
                          onDelete={handleDelete(index)}
                        />
                      ))}
                    </Box>
                  );
                }
                return (
                  <Chip label={selected.name} onDelete={handleRemoveAll} />
                );
              }}
              MenuProps={MenuProps}
            >
              {sourceRelationData.map((item: any) => (
                <MenuItem key={item.id} value={item}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {multiple && (
          <Grid item>
            <Button
              onClick={handleRemoveAll}
              startIcon={<ClearIcon />}
              label="CLEAR"
              className="remove-button"
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};
