const jwt = require("jsonwebtoken");

function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "missingUserError",
      message: "You must be logged in to perform this action",
    });
  }
  next();
}

const authRequired = (req, res, next) => {
  try {
    const token = req.signedcookies.token;
    jwt.verify(token, process.env.JWT_SECRET);
    res.status(401).send({
      loggedIn: "logged in",
      message: "message",
    });
  } catch (error) {
    return next();
  }
};

module.exports = { requireUser, authRequired };
