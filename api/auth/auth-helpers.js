const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets");

function buildToken(user) {
  const payload = {
    subject: user.user_id,
    email: user.email,
    role: user.role
  };
  const options = {
    expiresIn: "1d",
  };
  const result = jwt.sign(payload, JWT_SECRET, options)

  return result
}

module.exports = {
  buildToken,
};
