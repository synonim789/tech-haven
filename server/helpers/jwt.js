const { expressjwt: jwt } = require("express-jwt");
require("dotenv/config");
const secret = process.env.secret;
const api = process.env.API_URL;
function authJwt() {
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

const isRevoked = async (req, jwt) => {
  const payload = jwt.payload;
  if (!payload.isAdmin) {
    return true;
  }
  return false;
};
module.exports = authJwt;
