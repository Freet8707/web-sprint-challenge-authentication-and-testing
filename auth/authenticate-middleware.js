/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");

function restrict() {
  return async (req, res, next) => {
      try {
          const token = req.headers.authorization;
          if(!token) {
              return res.status(400).json({
                  message: "Invalid Credentials"
              })
          }

          jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
              if(err) {
                  return res.status(400).json({
                      message: "Invalid Credentials"
                  })
              }

              req.token = decoded

              next()
          })
      } catch(err) {
          next(err)
      }
  }
}

module.exports = restrict
