import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Confirm } from "react-admin";
import { saveButtonId } from "../_const/saveButtonId";
import { Http } from "../_helper/http";
import { GroupEditRow } from "./GroupEditRow";
import Divider from "@mui/material/Divider";
import { OrderChangeType } from "../_const/orderChangeType";
import { Endpoint } from "../_const/endpoint";
import { useCheckRelations } from "../_hooks/useCheckRelations";

export interface Props {
  source: string;
  foreignKey?: number | string;
  children: JSX.Element[] | JSX.Element;
}

export const GroupEdit = ({ children, source, foreignKey }: Props) => {
  const [stateValue, setStateValue] = useState<any[]>([]);

  const [confirmText, setConfirmText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [dataIndex, setDataIndex] = useState(0);

  const checkRelations = useCheckRelations(
    `${Endpoint.element_dictionary_values}/getAssignedDictionaryValues?id=`
  );

  useEffect(() => {
    const saveButton = document.getElementById(saveButtonId);
    if (saveButton) {
      saveButton.onclick = () => {
        Http.post(
          `${source}/${foreignKey}`,
          stateValue
            .filter((item: any) => item.name.length)
            .map((item: any, index: number) => ({
              ...item,
              order: index * 10,
              to_delete: item.to_delete || false,
            }))
        );
      };
    }
  }, [stateValue]);

  useEffect(() => {
    Http.get(`${source}/${foreignKey}`).then((result: any) => {
      setStateValue(
        result.data.data
          .map((item: any) => ({
            ...item,
            to_delete: false,
          }))
          .sort((itemA: any, itemB: any) => itemA.sort - itemB.sort)
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

  const removeItem = (dataIndex: number) => {
    const newValue = [...stateValue];
    newValue[dataIndex].to_delete = true;
    setStateValue(newValue);
  };

  const handleConfirm = () => {
    removeItem(dataIndex);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRemove = (dataIndex: number, id: number) => () => {
    checkRelations(id)
      .then(() => {
        removeItem(dataIndex);
      })
      .catch((count: number) => {
        setConfirmText(
          `Are you sure to remove relation ? You will lost ${count} connection/s.`
        );
        setDataIndex(dataIndex);
        setIsOpen(true);
      });
  };

  const handleOrderChange =
    (dataIndex: number, type: OrderChangeType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const newValue = [...stateValue];
      setStateValue(changeSort(newValue, dataIndex, type));
    };

  return (
    <div className="group-edit">
      Values
      {stateValue.map((item: any, dataIndex: number) => {
        if (item.to_delete) {
          return null;
        }
        return (
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
        );
      })}
      <Button
        onClick={handleAdd}
        startIcon={<AddCircleOutlineIcon />}
        color="primary"
        label=""
        size="large"
        sx={{ marginTop: "1em" }}
      />
      <Confirm
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onClose={handleClose}
        title="Confirm deleting relationship"
        content={confirmText}
      />
    </div>
  );
};

export const changeSort = (
  arr: any[],
  dataIndex: number,
  type: OrderChangeType
) => {
  const newArr = [...arr];
  const temp = newArr[dataIndex];
  if (type === OrderChangeType.up) {
    newArr[dataIndex] = newArr[dataIndex - 1];
    newArr[dataIndex - 1] = temp;
  } else {
    newArr[dataIndex] = newArr[dataIndex + 1];
    newArr[dataIndex + 1] = temp;
  }
  return newArr;
};
