import React, { cloneElement, useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Button } from "react-admin";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { apiUrl } from "../consts/apiUrl";
import { saveButtonId } from "../consts/saveButtonId";

export interface Props {
  source: string;
  foreignKey: number | string;
  children: JSX.Element[] | JSX.Element;
}

export const GroupEdit = ({ children, source, foreignKey }: Props) => {
  const arrayChildren = React.Children.toArray(children);

  const [stateValue, setStateValue] = useState<any[]>([]);

  useEffect(() => {
    const saveButton = document.getElementById(saveButtonId);
    if (saveButton) {
      saveButton.onclick = () => {
        axios.post(`${apiUrl}/${source}/${foreignKey}`, stateValue.map(item => item.name));
      };
    }
  }, [stateValue]);

  useEffect(() => {
    function getData() {
      return axios.get(`${apiUrl}/${source}/${foreignKey}`);
    }

    getData()
      .then((result: any) => {
        setStateValue(result.data.data);
      })
      .catch((e) => {
        console.error(
          e.name,
          e.message,
          e.request.status,
          e.request.statusText
        );
      });
  }, [setStateValue]);

  const handleChange =
    (dataIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = [...stateValue];
      newValue[dataIndex].name = event.target.value;
      setStateValue(newValue);
    };

  const handleAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newValue = [...stateValue];
    newValue.push({ name: "", id: 0 });
    setStateValue(newValue);
  };

  const handleRemove =
    (dataIndex: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const newValue = [...stateValue];
      newValue.splice(dataIndex, 1);
      setStateValue(newValue);
    };

  return (
    <div className="group-edit">
      Values
      <Divider />
      {stateValue.map((item: any, dataIndex: number) => (
        <Grid key={dataIndex} container spacing={2} alignItems="center">
          <Grid item>{dataIndex + 1}</Grid>
          {React.Children.map(arrayChildren, (child, index) => (
            <Grid item>
              {cloneElement(child as JSX.Element, {
                label: (child as JSX.Element).props["data-label"],
                value: item[(child as JSX.Element).props["data-field"]],
                onChange: handleChange(dataIndex),
              })}
            </Grid>
          ))}
          <Grid item>
            <Button
              onClick={handleRemove(dataIndex)}
              startIcon={<RemoveCircleOutlineIcon />}
              label="REMOVE"
              className="remove-button"
            />
          </Grid>
        </Grid>
      ))}
      <Button
        onClick={handleAdd}
        startIcon={<AddCircleOutlineIcon />}
        color="primary"
        label="ADD"
        sx={{ marginTop: "1em" }}
      />
    </div>
  );
};
