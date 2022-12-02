import React, { useEffect, useState } from "react";
import { FilterName } from "../../const/filterName";
import { FilterValue } from "../../const/filterValue";
import { Http } from "../../service/http";
import { Element } from "../../types/element";
import { elements } from "../../_to_remove/elements";
import { ProgressBar } from "../ProgressBar/ProgressBar";

interface Props {
  filterValue: FilterValue;
}

export const ElementList = ({ filterValue }: Props) => {
  const [loading, setLoading] = useState(false);
  const [lamps, setLamps] = useState<Element[]>([]);

  useEffect(() => {
    setLoading(true);
    Http.get(`elements?filter[${FilterName.type}]=${filterValue}`)
      .then((response: { data: { data: Element[] } }) => {
        console.log(response);
        setLamps(response.data.data);
      })
      .catch((e) => {
        setLamps(elements);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: "25px",
        flexWrap: "wrap",
        textAlign: "left",
      }}
    >
      <ProgressBar isVisible={loading} />
      {lamps.map((lamp: Element, index: number) => (
        <div key={index} className="card" style={{ width: "200px" }}>
          <img
            src={lamp.thumbnail}
            className="card-img-top"
            alt={lamp.name}
            height="250"
          />
          <div className="card-body">
            <h5 className="card-title">{lamp.name}</h5>
            <p className="card-text">Some quick example text ...</p>
            <div className="mb-2">
              {index === 0 && <span className="badge text-bg-light">Lamp</span>}
              {Boolean(index % 2) && (
                <span className="badge rounded-pill text-bg-success me-1">
                  New
                </span>
              )}
              {Boolean(index % 3) && (
                <span className="badge rounded-pill text-bg-warning">
                  Special offer!
                </span>
              )}
            </div>

            {Boolean(index % 3) && (
              <p className="h6 mb-2">
                Price:{" "}
                <span className="text-muted">
                  <s>123.99 $</s>
                </span>{" "}
                99.99 $
              </p>
            )}
            {!Boolean(index % 3) && <p className="h6 mb-2">Price: 321.01 $</p>}

            <div
              className="form-check mb-3"
              style={{ display: "flex", gap: "5px" }}
            >
              <input className="form-check-input" type="checkbox" value="" />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Pick
              </label>
            </div>
            <a href="#" className="btn btn-primary">
              Find out more
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
