import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder, setOrder } from "../order-store";

export const ChangeOrder = () => {
  const { order } = useSelector(selectOrder);
  const dispatch = useDispatch();

  const options = [
    { label: "Name A-Z", value: "name,asc" },
    { label: "Name Z-A", value: "name,desc" },
    { label: "Newest first", value: "creationDate,desc" },
    { label: "Oldest first", value: "creationDate,asc" },
  ];

  const handleChange = (param: any) => {
    dispatch(setOrder(param.target.value));
  };

  return (
    <>
      Order:
      <select
        className="form-select-sm"
        onChange={handleChange}
        defaultValue={order as any}
        style={{ cursor: "pointer", marginLeft: "0.5em" }}
      >
        {options.map((item: any) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </>
  );
};
