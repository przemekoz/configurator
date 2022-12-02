import React from "react";
import { useMatch } from "react-router";
import { Outlet, Link } from "react-router-dom";
import { AppUrl } from "../../const/appUrls";

export const Home = () => {
  const matchCrowns = Boolean(useMatch(AppUrl.crowns));
  const matchLamps = Boolean(useMatch(AppUrl.lamps));
  const matchColumns = Boolean(useMatch(AppUrl.columns));

  return (
    <div className="container m-5">
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
        <Outlet />
      </div>
    </div>
  );
};
