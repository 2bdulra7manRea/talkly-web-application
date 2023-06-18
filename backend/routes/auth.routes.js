
const AuthController = require("../controller/auth.controller");
const AuthService = require("../services/auth.service");
const Routing = require("../services/Routing.service");



const authRouter = (app) => {


    const authService= new AuthService();
    const authController = new AuthController(authService)

    const route = new Routing(app);
    route.post("/auth/register", authController.register.bind(authController));
    route.post("/auth/login", authController.login.bind(authController));
    route.patch("/auth/user", authController.updateUser.bind(authController));
    route.get("/auth/user-profile", authController.getUserInfo.bind(authController));
    route.get("/auth/user/:securityId", authController.getUserBySecurityId.bind(authController));
  };
  
  module.exports = { authRouter };
  
