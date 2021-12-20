const router = require("express").Router();
const bcryptjs = require("bcryptjs");

// const Users = require("../users/users-model");
const { buildToken } = require("./auth-helpers");

// const { checkUsernameExists, validateRoleName } = require("./auth-middleware");

router.post("/register", validateRoleName, (req, res, next) => {

  const { username, password } = req.body;
  const { role_name } = req;
  const hash = bcryptjs.hashSync(password, 8);
  Users.add({ username, password: hash, role_name })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

router.post("/login", checkUsernameExists, (req, res, next) => {

    let { username, password } = req.body;

    Users.findBy({ username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = buildToken(user);
          res.status(200).json({
            message: `Welcome, ${user.username}`,
            token,
          });
        } else {
          next({ status: 401, message: "Invalid credentials" });
        }
      })
      .catch(next);
});

module.exports = router;
