import axios from "axios";
import { apiUrl } from "../_const/apiUrl";

export class Request {
  static get(url: string) {
    return axios.get(Request.getUrl(url));
  }

  static post(url: string, params: any) {
    return axios.post(Request.getUrl(url), params);
  }

  private static getUrl(url: string) {
    return `${apiUrl}/${url}`;
  }
}
