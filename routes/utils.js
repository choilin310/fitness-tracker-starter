const jwt = require("jsonwebtoken");

const authRequired = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    console.log("Token: ", token);
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "You are not authorized!!!",
    });
    return;
  }
  next();
};

function requireUser(req, res, next) {

    if (!req.user) {
      next({
        name: "MissingUserError",
        message: "You must be logged in to perform this action"
      });
    }
  
    next();
  }
  
  module.exports = {
    requireUser,
    authRequired
  }