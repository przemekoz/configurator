import React, { useState } from "react";
import { ValueLabel } from "../../../types/valueLabel";

export interface Props {
  label: string;
  code: string;
  options: ValueLabel[];
  onSave(data: ValueLabel[], code: string, label: string): void;
}

export const FilterSingle = ({ options, label, onSave, code }: Props) => {
  const [value, setValue] = useState<ValueLabel>({ label: "", value: "" });

  const handleChange = (optionLabel: string) => (event: any) => {
    const {
      target: { value },
    } = event;
    setValue({ value, label: optionLabel });
  };

  const handleSave = () => {
    onSave([value], code, label);
  };

  const handleClear = () => {
    setValue({ label: "", value: "" });
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
              type="radio"
              className="me-1"
              name="name"
              value={item.value}
              onChange={handleChange(item.label)}
              style={{ cursor: "pointer" }}
              checked={value.value === item.value}
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
