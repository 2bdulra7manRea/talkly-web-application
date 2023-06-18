import axios from "axios";
import { config } from "../../../configs";

export default class BaseApi {
  url = config.URL;
  route;
  constructor(route) {
    this.route = route;
  }

  get(path) {
    return axios.get(`${this.url}/${this.route}/${path ? path : ""}`);
  }

  post(data, path) {
    return axios.post(`${this.url}/${this.route}/${path ? path : ""}`, data);
  }

  patch(data, path) {
    return axios.patch(`${this.url}/${this.route}/${path ? path : ""}`, data);
  }
}
