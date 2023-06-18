const { uuid } = require("uuidv4");
const AuthHelper = require("../helpers/auth.helper");
const userModel = require("../models/user.model");
const ElasticUsers = require("./elastic/users");

module.exports = class AuthService {
  async login(body) {
    const { password, email } = body;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("Authentication Failed.");
    }

    const isMatched = await AuthHelper.verifyPassword(user.password, password);
    if (!isMatched) {
      throw new Error("Authentication Failed.");
    }

    return {
      token: AuthHelper.generateToken(user),
      securityId: user.securityId
    };
  }

  async register(body) {
    const { password } = body;

    const userIsFound = await userModel.findOne({ email: body.email });

    if (userIsFound) {
      throw new Error(`you connot register with your email ${body.email}`);
    }

    const hashed = await AuthHelper.hashPassword(password);

    const userData = {
      ...body,
      password: hashed,
      date: new Date(),
      securityId: uuid().replace(/-/g, "")
    };

    const user = await userModel.create(userData);

    await ElasticUsers.create(user);

    const token = AuthHelper.generateToken(user);

    return { token, securityId: user.securityId };
  }

  async getUserInfo(token) {
    const decodedDataToken = AuthHelper.decodeToken(token);
    const { userId } = decodedDataToken;

    if (!userId) {
      throw new Error("authentication failed");
    }

    const user = await userModel.findById(userId, {
      password: 0,
      _id: 0,
      __v: 0
    });

    console.log(user);

    return user;
  }

  async getUserBySecurityId(id) {
    if (!id) {
      throw new Error("non valid");
    }

    const user = await userModel.findOne(
      { securityId: id },
      { password: 0, _id: 0, __v: 0 }
    );

    console.log(user);
    return user;
  }

  async getIdBySecurityId(id) {
    return userModel.findOne({ securityId: id }, { _id: 1, __v: 0 });
  }

  async updateUser(body, id) {
    const result = await userModel.updateOne({ _id: id }, body);
    console.log(body);
    console.log(result);

    // await ElasticUsers.update({_id:id , ...body})
    return { message: "updated" };
  }
};
