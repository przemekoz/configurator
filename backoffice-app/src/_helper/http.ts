import axios from "axios";
import { apiUrl } from "../_const/apiUrl";

export class Http {
  static get(url: string) {
    return axios.get(Http.getUrl(url));
  }

  static post(url: string, params: any) {
    return axios.post(Http.getUrl(url), params);
  }

  private static getUrl(url: string) {
    return `${apiUrl}/${url}`;
  }
}
