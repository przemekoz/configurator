import React from "react";
import { useMatch } from "react-router";
import { Outlet, Link } from "react-router-dom";
import { Filters } from "../../features/filter/Filters/Filters";
import { AppUrl } from "../../const/appUrls";
import { ChangeOrder } from "../../features/order/ChangeOrder/ChangeOrder";
import { FilterPills } from "../../features/filter/FilterPills/FilterPills";
import { useSelector } from "react-redux";
import { selectPreview } from "../../features/preview/preview-store";
import { Preview } from "../../features/preview/Preview/Preview";

export const Home = () => {
  const matchCrowns = Boolean(useMatch(AppUrl.crowns));
  const matchLamps = Boolean(useMatch(AppUrl.lamps));
  const matchColumns = Boolean(useMatch(AppUrl.columns));

  const { preview } = useSelector(selectPreview);
  console.log(preview);

  return (
    <div className="container my-3">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            className={`nav-link ${matchLamps ? "active" : ""}`}
            aria-current="page"
            to={AppUrl.lamps}
          >
            Lamps
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${matchCrowns ? "active" : ""}`}
            to={AppUrl.crowns}
          >
            Crowns
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${matchColumns ? "active" : ""}`}
            to={AppUrl.columns}
          >
            Columns
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled">Others</a>
        </li>
      </ul>
      <div className="pt-3">
        <div className="row">
          <div className="col-10">
            <Filters />
          </div>
          <div className="col-2 d-flex justify-content-end align-items-center">
            <ChangeOrder />
          </div>
        </div>
        <div className="my-2">
          <FilterPills />
        </div>
        <div className="row">
          <div className={preview ? "col-8" : "col-12"}>
            <Outlet />
          </div>
          {preview && (
            <div className="col-4">
              <Preview />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
