import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app-store";
import { PredefinedFilterType } from "../../const/filterValue";
import { selectFilter } from "../../features/filter/filter-selector";
import { selectOrder } from "../../features/order/order-store";
import { showPreview } from "../../features/preview/preview-store";
import { useGetViewFromUrl } from "../../hooks/useGetViewFromUrl";
import { useLoadAsyncData } from "../../hooks/useLoadAsyncData";
import { Element } from "../../types/element";
import { elements } from "../../_to_remove/mock-data";
import { ProgressBar } from "../ProgressBar/ProgressBar";

interface Props {
  filterValue: PredefinedFilterType;
}

export const ElementList = ({ filterValue }: Props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [lamps, setLamps] = useState<Element[]>([]);
  const { order } = useSelector(selectOrder);
  const view = useGetViewFromUrl();
  const filter = useSelector((state: RootState) => selectFilter(state, view));

  const load = useLoadAsyncData(
    (response) => {
      setLamps(response);
    },
    () => {
      setLamps(elements);
    },
    () => {
      setLoading(false);
    }
  );

  useEffect(() => {
    setLoading(true);
    load(
      `elements?filter=type:${filterValue}${
        filter ? `_amp_${filter}` : ""
      }&order=${order}`
    );
  }, [filter, order]);

  const handlePreviewClick = () => {
    dispatch(showPreview());
  };

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

            <button className="btn btn-primary" onClick={handlePreviewClick}>
              Pick
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
