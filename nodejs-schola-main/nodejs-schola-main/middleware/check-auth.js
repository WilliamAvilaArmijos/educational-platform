require("dotenv").config();
const jwt = require("jsonwebtoken");

const HttpError = require("../utils/http-error");

exports.authorization = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw new Error("Autorización fallida, token desconocido");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decodedToken.id,
      RoleId: decodedToken.RoleId,
    };

    next();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Autorización fallida", 403);
    return next(error);
  }
};
