import React, { useState } from "react";
import { ValueLabel } from "../../../types/valueLabel";

export interface Props {
  label: string;
  code: string;
  options: ValueLabel[];
  onSave(data: ValueLabel[], code: string, label: string): void;
}

export const FilterMultiple = ({ options, label, onSave, code }: Props) => {
  const [values, setValues] = useState<ValueLabel[]>([]);

  const handleChange = (label: string) => (event: any) => {
    const {
      target: { checked, name },
    } = event;
    const newValues = [...values];

    const index = newValues.findIndex(
      (item: ValueLabel) => item.value === name
    );

    if (index > -1) {
      newValues.splice(index, 1);
    }

    if (checked) {
      newValues.push({ value: name, label });
    }
    setValues(newValues);
  };

  const handleSave = () => {
    onSave(values, code, label);
  };

  const handleClear = () => {
    setValues([]);
    onSave([], code, label);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {label}
      </button>
      <ul className="dropdown-menu">
        {options.map((item: ValueLabel) => (
          <li key={item.value} className="ms-2 mb-1">
            <input
              type="checkbox"
              className="me-1"
              name={item.value}
              value={item.value}
              onChange={handleChange(item.label)}
              checked={
                values.findIndex(
                  (inItem: ValueLabel) => inItem.value === item.value
                ) > -1
              }
              style={{ cursor: "pointer" }}
            />
            {item.label}
          </li>
        ))}
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button className="btn" onClick={handleClear}>
            Clear
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            SAVE
          </button>
        </li>
      </ul>
    </div>
  );
};
