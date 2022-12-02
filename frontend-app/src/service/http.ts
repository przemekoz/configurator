import axios from "axios";

const domain = "http://localhost/fe-api/";

export class Http {
  static get(url: string) {
    return axios.get(domain + url);
  }
}
