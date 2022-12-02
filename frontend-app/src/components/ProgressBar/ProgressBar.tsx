import React from "react";

export interface Props {
  isVisible: boolean;
}

const style = { width: "100%", height: "5px" };
export const ProgressBar = ({ isVisible }: Props) =>
  isVisible ? (
    <div className="progress" style={style}>
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-label="Animated striped example"
        aria-valuenow={100}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ width: "100%" }}
      ></div>
    </div>
  ) : (
    <div style={style}></div>
  );
