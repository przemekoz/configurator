import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button } from "react-admin";
import { saveButtonId } from "../_const/saveButtonId";
import { Http } from "../_helper/http";
import { GroupEditRow } from "./GroupEditRow";
import Divider from "@mui/material/Divider";
import { OrderChangeType } from "../_const/orderChangeType";

export interface Props {
  source: string;
  foreignKey: number | string;
  children: JSX.Element[] | JSX.Element;
}

export const GroupEdit = ({ children, source, foreignKey }: Props) => {
  const [stateValue, setStateValue] = useState<any[]>([]);

  useEffect(() => {
    const saveButton = document.getElementById(saveButtonId);
    if (saveButton) {
      saveButton.onclick = () => {
        Http.post(`${source}/${foreignKey}`, stateValue);
      };
    }
  }, [stateValue]);

  useEffect(() => {
    Http.get(`${source}/${foreignKey}`)
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

  const handleRemove = (dataIndex: number) => {
    const newValue = [...stateValue];
    newValue.splice(dataIndex, 1);
    setStateValue(newValue);
  };

  const handleOrderChange =
    (dataIndex: number, type: OrderChangeType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const newValue = [...stateValue];
      const temp = newValue[dataIndex];
      if (type === OrderChangeType.up) {
        newValue[dataIndex] = newValue[dataIndex - 1];
        newValue[dataIndex - 1] = temp;
      } else {
        newValue[dataIndex] = newValue[dataIndex + 1];
        newValue[dataIndex + 1] = temp;
      }
      setStateValue(newValue);
    };

  return (
    <div className="group-edit">
      Values
      {stateValue.map((item: any, dataIndex: number) => (
        <div key={dataIndex}>
          <GroupEditRow
            index={dataIndex}
            item={item}
            handleChange={handleChange}
            handleRemove={handleRemove}
            handleOrderChange={handleOrderChange}
            length={stateValue.length}
          >
            {children}
          </GroupEditRow>
          <Divider />
        </div>
      ))}
      <Button
        onClick={handleAdd}
        startIcon={<AddCircleOutlineIcon />}
        color="primary"
        label=""
        size="large"
        sx={{ marginTop: "1em" }}
      />
    </div>
  );
};
