const router = require("express").Router();
const bcryptjs = require("bcryptjs");

const Users = require("../users/user-model");
const { buildToken } = require("./auth-helpers");

 const { checkUsernameExists, validateRole } = require("./auth-middleware");

router.post("/register", validateRole, (req, res, next) => {

<<<<<<< HEAD
  const { first_name, last_name, password } = req.body;
  const { role } = req;
  const hash = bcryptjs.hashSync(password, 8);
  Users.add({ first_name, last_name, password: hash, role })
=======
  const { first_name, last_name, password, email } = req.body;
  const { role } = req;
  const hash = bcryptjs.hashSync(password, 8);
  Users.add({ first_name, last_name, password: hash, email, role })
>>>>>>> 981d514e977370ea39275c959a258ad9101a7f33
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

router.post("/login", checkUsernameExists, (req, res, next) => {

    let { email, password } = req.body;

    Users.findBy({ email })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = buildToken(user);
          res.status(200).json({
            message: `Welcome, ${user.first_name}`,
            token,
          });
        } else {
          next({ status: 401, message: "Invalid credentials" });
        }
      })
      .catch(next);
});

module.exports = router;
