const { Op } = require("sequelize");

const HttpError = require("../utils/http-error");

const User = require("../models/user");
const Course = require("../models/course");
const Theme = require("../models/theme");

exports.createThemeByCourseId = async (req, res, next) => {
  const { name, description } = req.body;
  const CourseId = req.params.cid;
  const UserRoleId = req.user.RoleId;

  if (UserRoleId !== 3) {
    const error = new HttpError(
      "Solo los usuarios con rol profesor pueden crear temas",
      401
    );
    return next(error);
  }

  try {
    const course = await Course.findOne({
      where: {
        id: CourseId,
      },
    });

    if (!course) {
      const error = new HttpError("Curso no encontrado", 404);
      return next(error);
    }

    const theme = await Theme.create({
      name,
      description,
      CourseId: course.id,
    });

    res.status(201).json(theme);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError("Ha ocurrido un error al crear un tema", 500);
    return next(error);
  }
};

exports.getThemesByCourseIdByTeacher = async (req, res, next) => {
  const { page, pageSize, name } = req.query;
  const CourseId = req.params.cid;
  const pageNumber = page ? parseInt(page) : 1;
  const limit = pageSize ? parseInt(pageSize) : 10;
  const offset = page ? parseInt(page) * limit : 0;

  try {
    const teacher = await User.findOne({
      where: { id: req.user.id, roleId: 3 },
    });

    if (!teacher) {
      const error = new HttpError(
        "Solo los usuarios con rol profesor pueden ver sus temas",
        500
      );
      return next(error);
    }

    const course = await Course.findOne({
      where: {
        id: CourseId,
      },
    });

    if (!course) {
      const error = new HttpError("Curso no encontrado", 404);
      return next(error);
    }

    const themes = await Theme.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${name ? name : ""}%`,
        },
        CourseId: course.id,
      },
      limit,
      offset,
    });

    res.json({
      themes: themes.rows,
      pageNumber: pageNumber,
      pageSize: limit,
      count: themes.count,
    });
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al ver tus temas por curso como profesor",
      500
    );
    return next(error);
  }
};

exports.getThemeById = async (req, res, next) => {
  const ThemeId = req.params.tid;

  try {
    const theme = await Theme.findOne({ where: { id: ThemeId } });

    res.json(theme);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al cargar los datos",
      500
    );
    return next(error);
  }
};
