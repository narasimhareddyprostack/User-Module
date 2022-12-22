const jwt = require("jsonwebtoken");
// JWT Token verifification
let authenticate = (request, response, next) => {
  if (!request.headers.authorization) {
    return response.status(401).send("Unauthorized Request");
  }
  let token = request.headers.authorization.split(" ")[1];
  console.log(token);
  if (token === null) {
    return response.status(401).send("Unauthorized Request");
  }
  let payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!payload) {
    return response.status(401).send("Unauthorized Request");
  }
  request.user = payload.user;
  next();
};
module.exports = authenticate;
