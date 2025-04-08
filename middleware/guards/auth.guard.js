const { errorHandler } = require("../../helpers/error_handler");
const jwtService = require("../../services/jwt.service");

module.exports = async function (req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res
        .status(403)
        .send({ message: "authorization token berilmagan" });
    }
    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];
    if (bearer != "Bearer" || !token) {
      return res.status(403).send({ messaga: "Bearer yoki token berilmagan" });
    }
    // const decodedToken = jwt.verify(token, config.get("tokenKey"));
    const decodedToken = await jwtService.verifyAccessToken(token);
    console.log(decodedToken);
    req.user = decodedToken;
    console.log(req.user);
    
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};
