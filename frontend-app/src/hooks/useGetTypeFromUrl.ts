import { useLocation } from "react-router-dom";
import { AppUrl } from "../const/appUrls";
import { PredefinedFilterType } from "../const/filterValue";

export const useGetViewFromUrl = (): PredefinedFilterType | undefined => {
  switch (useLocation().pathname) {
    case AppUrl.columns:
      return PredefinedFilterType.column;

    case AppUrl.crowns:
      return PredefinedFilterType.crown;

    case AppUrl.lamps:
      return PredefinedFilterType.lamp;

    default:
      return undefined;
  }
};
