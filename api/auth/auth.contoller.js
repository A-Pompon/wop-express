const authService = require("./auth.service");
const utilLogin = require("../../utils/utils-login");
const NotFoundError = require("../../errors/not-found");

class AuthController {
  async registerUser(req, res, next) {
    try {
      if (!utilLogin.validePassword(req.body.password)) {
        throw new Error("Format password invalid.");
      }

      const user = await authService.registerUser(req.body);

      const tokens = authService.generateTokens(user._id, user.email);
      res.json(tokens);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }

  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const userId = await authService.loginUser(email, password);
      if (!userId) {
        throw new NotFoundError();
      }

      const tokens = authService.generateTokens(userId, email);
      res.json(tokens);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }

  refreshToken = async (req, res, next) => {
    try {
      console.log("refreshToken");
      console.log(req.body);
      const refreshToken = req.body.refresh_token;
      const tokens = await authService.verifyRefreshToken(refreshToken);
      console.log(res.status);
      res.json(tokens);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };
}

module.exports = new AuthController();
