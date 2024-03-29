const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Bearer[0] TOKEN[1]
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res
      .status(401)
      .json({ error: "Accès refusé, vous devez vous identifiez." });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json({ error: error.message });
    console.log(user);
    req.userId = user.userId;
    next();
  });
};
