const jwt = require("jsonwebtoken");

const authorizeUser = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (auth) {
      const token = auth.split(" ")[1];
      if (token) {
        await jwt.verify(token, process.env.SECRET, (err, payload) => {
          if (err) {
            res.status(500).json({
              message: err.message,
            });
          } else {
            req.user = payload;
            next();
          }
        });
      } else {
        res.status(400).json({
          message: "invalid token",
        });
      }
    } else {
      res.status(500).json({
        status: "Failed",
        message: "Login to perform this action",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

module.exports = authorizeUser;
