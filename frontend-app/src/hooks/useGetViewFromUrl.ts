import { useLocation } from "react-router-dom";
import { AppUrl } from "../const/appUrls";
import { ViewWithFilters } from "../const/viewWithFilters";

export const useGetViewFromUrl = (): ViewWithFilters | undefined => {
  switch (useLocation().pathname) {
    case AppUrl.columns:
      return ViewWithFilters.columns;

    case AppUrl.crowns:
      return ViewWithFilters.crowns;

    case AppUrl.lamps:
      return ViewWithFilters.lamps;

    default:
      return undefined;
  }
};
