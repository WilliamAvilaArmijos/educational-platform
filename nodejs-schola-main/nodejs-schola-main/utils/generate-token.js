require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      RoleId: user.RoleId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "365d" }
  );
};
