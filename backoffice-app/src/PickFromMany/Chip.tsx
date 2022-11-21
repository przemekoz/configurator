import React from "react";
import ChipComp from "@mui/material/Chip";

export interface Props {
  label: string;
  onDelete(): void;
}

export const Chip = ({ label, onDelete }: Props) => {
  return (
    <div className="chip">
      <ChipComp
        label={label}
        variant="outlined"
        onMouseDown={(event: any) => {
          event.stopPropagation();
        }}
        onDelete={onDelete}
      />
    </div>
  );
};
