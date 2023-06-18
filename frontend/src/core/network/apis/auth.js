import BaseApi from "./baseApi";

export default class AuthApis extends BaseApi {
  constructor() {
    super("auth");
  }

  login(body) {
    return super.post(body, "login");
  }

  register(body) {
    return super.post(body, "register");
  }
}
