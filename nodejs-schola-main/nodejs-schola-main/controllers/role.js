const HttpError = require("../utils/http-error");

const Role = require("../models/role");

exports.createRole = async (req, res, next) => {
  const { name, description } = req.body;

  const existingRole = await Role.findOne({ where: { name } });

  if (existingRole) {
    const error = new HttpError("El rol ya existe", 409);
    return next(error);
  }

  try {
    const role = await Role.create({
      name,
      description,
    });

    res.status(201).json(role);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError("Ha ocurrido un error al crear el rol", 500);
    return next(error);
  }
};
