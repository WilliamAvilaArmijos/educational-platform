const Sequelize = require("sequelize");
const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");

const HttpError = require("../utils/http-error");
const { generateToken } = require("../utils/generate-token");

const Role = require("../models/role");
const User = require("../models/user");

AWS.config.update({
  region: process.env.BUCKETEER_AWS_REGION,
  accessKeyId: process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

exports.createUser = async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    password,
    birthday,
    city,
    country,
    phone,
    RoleId,
  } = req.body;
  let hashedPassword;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      const error = new HttpError("El usuario ya existe", 409);
      return next(error);
    }

    hashedPassword = await bcrypt.hash(password, 10);

    const file = req.file;

    const params = {
      Bucket: process.env.BUCKETEER_BUCKET_NAME,
      Key: Date.now().toString(),
      Body: file.buffer,
      ACL: "public-read",
      ContentType: file.mimetype,
    };

    s3.upload(params, async (err, data) => {
      if (err) {
        const error = new HttpError(
          "Ha ocurrido un error al registrar el usuario",
          404
        );
        return next(error);
      }

      const url = data.Location;

      const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        birthday,
        city,
        country,
        phone,
        imageUrl: url,
        RoleId,
      });

      res.status(201).json({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        city: user.city,
        country: user.country,
        imageUrl: user.imageUrl,
        token: generateToken(user),
        isActive: user.isActive,
        RoleId: user.RoleId,
      });
    });
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al crear el usuario",
      500
    );
    return next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      const error = new HttpError("El usuario no se encuentra registrado", 409);
      return next(error);
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      const error = new HttpError(
        "El correo o la contraseña no coinciden",
        409
      );
      return next(error);
    }

    res.json({
      id: existingUser.id,
      email: existingUser.email,
      token: generateToken(existingUser),
      RoleId: existingUser.RoleId,
    });
  } catch (err) {
    console.error(err.message);
    const error = new HttpError("Ha ocurrido un error al iniciar sesión", 500);
    return next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const {
    email,
    password,
    firstname,
    lastname,
    birthday,
    city,
    country,
    phone,
  } = req.body;
  const id = req.params.uid;
  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 10);

    const file = req.file;

    const params = {
      Bucket: process.env.BUCKETEER_BUCKET_NAME,
      Key: Date.now().toString(),
      Body: file.buffer,
      ACL: "public-read",
      ContentType: file.mimetype,
    };

    s3.upload(params, async (err, data) => {
      if (err) {
        const error = new HttpError(
          "Ha ocurrido un error al registrar el usuario",
          404
        );
        return next(error);
      }
      const url = data.Location;

      await User.update(
        {
          email,
          firstname,
          lastname,
          password: hashedPassword,
          birthday,
          city,
          country,
          phone,
          imageUrl: url,
        },
        { where: { id } }
      );

      const updatedUser = await User.findOne({ where: { id } });

      res.json({
        id: updatedUser.id,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
        imageUrl: updatedUser.imageUrl,
        birthday: updatedUser.birthday,
        city: updatedUser.city,
        country: updatedUser.country,
        phone: updatedUser.phone,
      });
    });
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al actualizar el usuario",
      500
    );
    return next(error);
  }
};

exports.getStudentsByAdmin = async (req, res, next) => {
  const { page, pagesize, keyword } = req.query;
  const pageNumber = page ? parseInt(page) : 1;
  const limit = pagesize ? parseInt(pagesize) : 10;
  const offset = page ? parseInt(page) * limit : 0;
  const UserRoleId = req.user.RoleId;

  if (UserRoleId !== 1) {
    const error = new HttpError(
      "Solo los usuarios con rol administrador pueden ver estos datos",
      401
    );
    return next(error);
  }

  try {
    const students = await User.findAndCountAll({
      where: {
        RoleId: 2,
        [Sequelize.Op.or]: [
          {
            firstname: {
              [Sequelize.Op.like]: `%${keyword ? keyword : ""}%`,
            },
          },
          {
            lastname: {
              [Sequelize.Op.like]: `%${keyword ? keyword : ""}%`,
            },
          },
          {
            email: {
              [Sequelize.Op.like]: `%${keyword ? keyword : ""}%`,
            },
          },
        ],
      },
      attributes: { exclude: ["password"] },
      limit,
      offset,
    });

    res.json({
      students: students.rows,
      pageNumber: pageNumber,
      pageSize: limit,
      count: students.count,
    });
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al consultar los estudiantes",
      500
    );
    return next(error);
  }
};

exports.getTeachersByAdmin = async (req, res, next) => {
  const { page, pagesize, keyword } = req.query;
  const pageNumber = page ? parseInt(page) : 1;
  const limit = pagesize ? parseInt(pagesize) : 10;
  const offset = page ? parseInt(page) * limit : 0;
  const UserRoleId = req.user.RoleId;

  if (UserRoleId !== 1) {
    const error = new HttpError(
      "Solo los usuarios con rol administrador pueden ver estos datos",
      401
    );
    return next(error);
  }

  try {
    const teachers = await User.findAndCountAll({
      where: {
        RoleId: 3,
        [Sequelize.Op.or]: [
          {
            firstname: {
              [Sequelize.Op.like]: `%${keyword ? keyword : ""}%`,
            },
          },
          {
            lastname: {
              [Sequelize.Op.like]: `%${keyword ? keyword : ""}%`,
            },
          },
          {
            email: {
              [Sequelize.Op.like]: `%${keyword ? keyword : ""}%`,
            },
          },
        ],
      },
      attributes: { exclude: ["password"] },
      limit,
      offset,
    });

    res.json({
      teachers: teachers.rows,
      pageNumber: pageNumber,
      pageSize: limit,
      count: teachers.count,
    });
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al consultar los estudiantes",
      500
    );
    return next(error);
  }
};

exports.countUsersByRoleByAdmin = async (req, res, next) => {
  try {
    const countUsersByRole = await User.count({
      attributes: [
        [Sequelize.literal("Role.description"), "Role"],
        [Sequelize.fn("COUNT", Sequelize.col("User.id")), "count"],
      ],
      include: [
        {
          model: Role,
          attributes: [],
          as: "Role",
        },
      ],
      group: ["Role.id"],
    });

    res.json(countUsersByRole);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al consultar los datos",
      500
    );
    return next(error);
  }
};

exports.getStudentByIdByAdmin = async (req, res, next) => {
  const id = req.params.uid;

  try {
    const user = await User.findOne({ where: { id } });

    res.json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      city: user.city,
      country: user.country,
      birthday: user.birthday,
      imageUrl: user.imageUrl,
      phone: user.phone,
      RoleId: user.RoleId,
    });
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al consultar los datos",
      500
    );
    return next(error);
  }
};

exports.getTeacherByIdByAdmin = async (req, res, next) => {
  const id = req.params.uid;
  const UserRoleId = req.user.RoleId;

  if (UserRoleId !== 1) {
    const error = new HttpError(
      "Solo los usuarios con rol administrador pueden ver estos datos",
      401
    );
    return next(error);
  }

  try {
    const user = await User.findOne({ where: { id } });

    res.json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      city: user.city,
      birthday: user.birthday,
      country: user.country,
      imageUrl: user.imageUrl,
      phone: user.phone,
      RoleId: user.RoleId,
    });
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al consultar los datos",
      500
    );
    return next(error);
  }
};
