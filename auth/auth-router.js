const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database/dbConfig");

const options = {
  expiresIn: "1hr"
}

router.post('/register', async (req, res) => {
  // implement registration
  const {username, password} = req.body;
  if(!username && !password) {
    return res.status(400).json({
      message: "Please provide a username and password"
    })
  }
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
        error: error
      })
    })
});

router.post('/login', async (req, res) => {
  // implement login
  const { username, password } = req.body;

  try {
    const user = await db("users")
      .select("*")
      .where("users.username", username)
      .first()

    const validPassword = await bcrypt.compare(password, user.password)

    if(user && validPassword) {
      const payload = {
        userID: user.id,
        username: user.username
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, options)

      res.status(200).json({
        message: "logged in !",
        token: token
      })
    }
    else {
      res.status(401).json({
        message: "Invalid Credentials!"
      })
    }
  } catch(err) {
    res.status(500).json({
      message: "Error",
      error: err
    })
  }
});

router.get("/cleanup", () => {
  Users.cleanUp()
})

module.exports = router;
