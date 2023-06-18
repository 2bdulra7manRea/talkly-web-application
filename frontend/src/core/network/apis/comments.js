import axios from "axios";
import BaseApi from "./baseApi";

export default class CommentsApis extends BaseApi {
  constructor() {
    super("comments");
  }

  get(query) {
    return axios.get(`${this.url}/${this.route}/`, {
      params: query
    });
  }

  generalQuery(path) {
    return super.get(path);
  }
  getCount(id) {
    return super.get(`${id}/count`);
  }
}
