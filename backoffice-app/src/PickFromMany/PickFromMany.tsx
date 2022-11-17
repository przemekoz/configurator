import React, { useEffect, useState } from "react";
import { Button } from "react-admin";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import ClearIcon from "@mui/icons-material/Clear";
import { saveButtonId } from "../_const/saveButtonId";
import { Request } from "../_helper/request";

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
  source: string;
  sourceRelation: string;
  saveTo: string;
}

export const PickFromMany = ({
  element_id,
  source,
  sourceRelation,
  saveTo,
  dictionary_id,
}: Props) => {
  const [sourceData, setSourceData] = useState<any>({ id: 0, name: "" });
  const [sourceRelationData, setSourceRelationData] = useState<any[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  useEffect(() => {
    const saveButton = document.getElementById(saveButtonId);
    if (saveButton) {
      saveButton.onclick = () => {
        Request.post(
          `${saveTo}/${element_id}`,
          selectedOptions.map((item) => item.id)
        );
      };
    }
  }, [selectedOptions]);

  useEffect(() => {
    Request.get(`${source}/${dictionary_id}`)
      .then((result: any) => {
        setSourceData(result.data);
      })
      .catch((e) => {
        console.error(
          e.name,
          e.message,
          e.request.status,
          e.request.statusText
        );
        setSourceData({ id: 1, name: "mocked dictionary name" });
      });

    Request.get(`${sourceRelation}/${dictionary_id}`)
      .then((result: any) => {
        setSourceRelationData(result.data.data);
      })
      .catch((e) => {
        console.error(
          e.name,
          e.message,
          e.request.status,
          e.request.statusText
        );
        setSourceRelationData([
          { id: 1, name: "mocked dictionary value 1" },
          { id: 2, name: "mocked dictionary value 2" },
          { id: 3, name: "mocked dictionary value 3" },
        ]);
      });
  }, [setSourceData, setSourceRelationData]);

  const handleChange = (event: SelectChangeEvent<typeof selectedOptions>) => {
    const {
      target: { value },
    } = event;
    setSelectedOptions(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleDelete = (index: number) => () => {
    console.log(index);
    const newValue = [...selectedOptions];
    newValue.splice(index, 1);
    setSelectedOptions(newValue);
  };

  const handleRemoveAll = () => {
    setSelectedOptions([]);
  };

  return (
    <div className="pick-from-many">
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <FormControl sx={{ m: 0, width: 400 }}>
            <InputLabel className="label-multi-select">
              {sourceData.name}
            </InputLabel>
            <Select
              multiple
              value={selectedOptions}
              onChange={handleChange}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  label={sourceData.name}
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value: any, index: number) => (
                    <Chip
                      key={value.id}
                      label={value.name}
                      variant="outlined"
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                      onDelete={handleDelete(index)}
                    />
                  ))}
                </Box>
              )}
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
        <Grid item>
          <Button
            onClick={handleRemoveAll}
            startIcon={<ClearIcon />}
            label="CLEAR"
            className="remove-button"
          />
        </Grid>
      </Grid>
    </div>
  );
};
