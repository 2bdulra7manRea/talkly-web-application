import BaseApi from "./baseApi";

export default class ElasticApis extends BaseApi {
  constructor() {
    super("elastic");
  }

  search(value) {
    return super.get(`search/${value}`);
  }
}
