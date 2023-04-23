const jwt = require("jsonwebtoken");

module.exports = (req, _, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded?.data;
    next();
  } catch (error) {
    next({
      message: "Auth failed",
      status: 401,
    });
  }
};
