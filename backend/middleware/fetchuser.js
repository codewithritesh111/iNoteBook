const jwt = require("jsonwebtoken");
const users = require("../models/users");
require("dotenv").config();

const fetchUser = (req, res, next) => {
  const a = req.header("auth");
  if (!a) {
    res.status(404).send("Enter a valid token");
  } else {
    try {
      const b = jwt.verify(a, "ritesh").use;
      res.ans = b;
      next();
    } catch (error) {
      res.send("Unauthorized1");
    }
  }
};

module.exports = fetchUser;
