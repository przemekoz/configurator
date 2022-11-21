import React from "react";
import { LinearProgress } from "react-admin";

export interface Props {
  isVisible: boolean;
}

export const ProgressBar = ({ isVisible }: Props) => {
  return (
    <div className="progress-bar">
      {isVisible ? <LinearProgress /> : <div style={{ height: "10px" }}></div>}
    </div>
  );
};
