const router = require("express").Router();
const bcryptjs = require("bcryptjs");

const Users = require("../users/user-model");
const { buildToken } = require("./auth-helpers");

 const { validateRole } = require("./auth-middleware");

router.post("/register", validateRole, (req, res, next) => {

  const { first_name, last_name, password, email } = req.body;
  const { role } = req;
  const hash = bcryptjs.hashSync(password, 8);
  Users.add({ first_name, last_name, password: hash, email, role })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

router.post("/login", (req, res, next) => {

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

router.get('/logout', async (req, res, next) => {
  try {
    if (req.token) {
      req.token.destroy((err) => {
        if (err) {
          res.json('Could not log you out!')
        } else {
          res.json('Logged out!')
        }
      })
    } else {
      res.json('No session!')
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router;
