const { JWT_SECRET } = require("../secrets");
const { findBy } = require("../users/user-model");
const jwt = require("jsonwebtoken");

const restricted = (req, res, next) => {

  const token = req.headers.authorization;
  if (!token) {
    return next({ status: 401, message: "Token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      next({ status: 401, message: "Token invalid" });
    } else {
      req.decodedToken = decodedToken;
      next();
    }
  });
};

const only = (role) => (req, res, next) => {

  if (role === req.decodedToken.role) {
    next();
  } else {
    next({ status: 403, message: "This is not for you" });
  }
};

const checkUsernameExists = async (req, res, next) => {

  try {
    const [user] = await findBy({ username: req.body.username });
    if (!user) {
      next({ status: 401, message: "Invalid credentials" });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateRole = (req, res, next) => {

  if (!req.body.role || !req.body.role.trim()) {
    (req.role = "client"), next();
  } else if (req.body.role.trim() === "instructor") {
    req.role = "instructor", next();
  } else if (req.body.role.trim().length > 32) {
    next({ status: 422, message: "Role name can not be longer than 32 chars" });
  } else {
    (req.role = "client"), next();
  }
};

module.exports = {
  restricted,
  checkUsernameExists,
  validateRole,
  only,
};
