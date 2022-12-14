import React from "react";
import { useDispatch } from "react-redux";
import { hidePreview } from "../preview-store";

export const Preview = () => {
  const dispatch = useDispatch();
  const handlePreviewClick = () => {
    dispatch(hidePreview());
  };
  return (
    <div style={{ paddingTop: "30px" }}>
      <div
        style={{
          border: "1px dashed black",
          height: "100px",
          marginBottom: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:
            "linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))",
        }}
      >
        Lamp Preview
      </div>
      <div
        style={{
          border: "1px dashed black",
          height: "100px",
          marginBottom: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:
            "linear-gradient(to right, rgba(0,255,0,0), rgba(0,255,0,1))",
        }}
      >
        Crown Preview
      </div>
      <div
        className="mb-3"
        style={{
          border: "1px dashed black",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,255,0), rgba(0,0,255,1))",
        }}
      >
        Column Preview
      </div>
      <button className="btn btn-primary" onClick={handlePreviewClick}>
        Hide preview
      </button>
    </div>
  );
};
