const router = require('express').Router();
const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig");

router.post('/register', async (req, res) => {
  // implement registration
  const {username, password} = req.body;

  return await db("users")
    .insert({
      username: username,
      password: await bcrypt.hash(password, 14)
    })
    .then(response => {
      res.status(201).json({
        message: "user successfully created",
        userId: response
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error adding that user",
        error: `Error: ${error}`
      })
    })
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
