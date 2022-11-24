import React, { cloneElement, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ClearIcon from "@mui/icons-material/Clear";
import { Button } from "react-admin";
import Grid from "@mui/material/Grid";
import { OrderChangeType } from "../_const/orderChangeType";
import { ConfirmBeforeDeletingRelation } from "../Confirm/ConfirmBeforeDeletingRelation";
import { Endpoint } from "../_const/endpoint";

export interface Props {
  index: number;
  handleRemove(index: number): void;
  handleOrderChange(
    index: number,
    type: OrderChangeType
  ): (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChange(
    index: number
  ): (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: JSX.Element[] | JSX.Element;
  item: any;
  length: number;
}

export const GroupEditRow = ({
  index,
  handleRemove,
  handleChange,
  handleOrderChange,
  children,
  item,
  length,
}: Props) => {
  const arrayChildren = React.Children.toArray(children);

  const [itemId, setItemId] = useState(0);
  const [removeIndex, setRemoveIndex] = useState(0);

  const onClickRemove = (index: number, id: number) => () => {
    setRemoveIndex(index);
    setItemId(id);
  };

  const onConfirmRemove = () => {
    console.log("onConfirmRemove", itemId, removeIndex);
    handleRemove(removeIndex);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>{index + 1}</Grid>
      {React.Children.map(arrayChildren, (child, innerIndex) => (
        <Grid item>
          {cloneElement(child as JSX.Element, {
            label: (child as JSX.Element).props["data-label"],
            value: item[(child as JSX.Element).props["data-field"]],
            onChange: handleChange(index),
          })}
        </Grid>
      ))}
      <Grid item>
        <Button
          onClick={onClickRemove(index, item.id)}
          startIcon={<ClearIcon />}
          label=""
          className="remove-button"
        />
        {Boolean(index) && (
          <Button
            onClick={handleOrderChange(index, OrderChangeType.up)}
            startIcon={<ArrowUpwardIcon />}
            label=""
            sx={{ color: "green" }}
            className="order-up-button"
          />
        )}
        {index === 0 && <Spacer />}
        {length > 1 && length - 1 > index && (
          <Button
            onClick={handleOrderChange(index, OrderChangeType.down)}
            startIcon={<ArrowDownwardIcon />}
            label=""
            className="order-down-button"
          />
        )}
      </Grid>
      <ConfirmBeforeDeletingRelation
        getUrl={`${Endpoint.element_dictionary_values}/getAssignedDictionaryValues?id=`}
        id={itemId}
        onConfirm={onConfirmRemove}
        title="Confirm deleting dictionary value relation"
        text="Are you sure to remove relation ?"
      />
    </Grid>
  );
};

export const Spacer = () => (
  <div style={{ width: "65px", display: "inline-flex" }}></div>
);
