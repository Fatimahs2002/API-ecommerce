const jwt = require("jsonwebtoken");

const isAuth = (roles) => {
  return (req, res, next) => {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    )
      return res.status(400).json({
        success: false,
        message:
          "No authorization credentials, unable to check if authenticated",
      });
    const token = req.headers.authorization.split(" ")[1];

    if (!token)
      return res.status(400).json({
        success: false,
        message: "No token",
      });
    try {
      const credentials = jwt.verify(token, process.env.JWT_SECRET);
      const hasAccess = roles.includes(credentials.role);
      if (!hasAccess)
        return res.status(400).json({
          success: false,
          message: "You are not authenticated",
        });
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Error occured",
        error: error.message,
      });
    }
  };
};

module.exports = isAuth;
