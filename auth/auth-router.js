const router = require('express').Router();
const bcrypt = require('bcryptjs');
// const protected = require('./authenticate-middleware.js');

const Users = require('./user-model.js');


router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  // implement login

  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user; // this is where we add the session to make a cookie
        res.status(200).json({ message: `Welcome ${user.username}! You are now logged in.` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    });

});

module.exports = router;
