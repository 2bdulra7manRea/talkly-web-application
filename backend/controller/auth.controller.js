const AuthHelper = require("../helpers/auth.helper");

module.exports = class AuthController {
  constructor(service) {
    this.service = service;
  }

  async login(ctx) {
    return this.service.login(ctx.req.body);
  }

  async register(ctx) {
    return this.service.register(ctx.req.body);
  }

  async updateUser(ctx) {
    const userId = AuthHelper.getUserId(ctx);

    const { body } = ctx.req;

    return this.service.updateUser(body, userId);
  }

  async getUserInfo(ctx) {
    const { token } = ctx.req;
    return this.service.getUserInfo(token);
  }

  async getUserBySecurityId(ctx){
    const {securityId} = ctx.req.params
    return this.service.getUserBySecurityId(securityId)
  }

};
