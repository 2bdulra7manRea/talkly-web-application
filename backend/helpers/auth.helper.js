const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("../configs");

const SECRET_KEY=config.SECRET_KEY_AUTH

module.exports = class AuthHelper {
  static async hashPassword(data) {
    const salt = await bcrypt.genSalt(config.SALT_NUM);
    return bcrypt.hash(data, salt);
  }

  static async verifyPassword(hashedPassword, password) {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateToken(payload) {
    const { _id, email } = payload;
    return jwt.sign({ email, userId: _id, date: new Date() },SECRET_KEY);
  }

  static decodeToken(token) {
    return jwt.verify(token,SECRET_KEY)
  }

  static getUserId(ctx){
    const {token} = ctx.req;
    const decodedDataToken = this.decodeToken(token)
    const {userId} = decodedDataToken
    if(!userId){
            throw new Error('Non valid token')
    }

    return userId
  }

};
