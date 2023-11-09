const Sequelize = require("sequelize");
const AWS = require("aws-sdk");

const HttpError = require("../utils/http-error");

const User = require("../models/user");
const Course = require("../models/course");
const Theme = require("../models/theme");
const Section = require("../models/section");
const Subscription = require("../models/subscription");
const Comment = require("../models/comment");

AWS.config.update({
  region: process.env.BUCKETEER_AWS_REGION,
  accessKeyId: process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

exports.createCourseByTeacher = async (req, res, next) => {
  const { name, description, duration, price } = req.body;
  const UserId = req.user.id;
  const UserRoleId = req.user.RoleId;

  if (UserRoleId !== 3) {
    const error = new HttpError(
      "Solo los usuarios con rol profesor pueden crear cursos",
      401
    );
    return next(error);
  }

  try {
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
          "Ha ocurrido un error al crear una sección",
          404
        );
        return next(error);
      }

      const url = data.Location;

      const course = await Course.create({
        name,
        description,
        releaseDate: new Date(),
        duration,
        price,
        imageUrl: url,
        UserId,
      });
      res.status(201).json(course);
    });
  } catch (err) {
    console.error(err.message);
    const error = new HttpError("Ha ocurrido un error al crear un curso", 500);
    return next(error);
  }
};

exports.updateCourseById = async (req, res, next) => {
  const { name, description, duration, price } = req.body;
  const UserRoleId = req.user.RoleId;
  const id = req.params.cid;

  if (UserRoleId !== 3) {
    const error = new HttpError(
      "Solo los usuarios con rol profesor pueden actualizar cursos",
      401
    );
    return next(error);
  }

  try {
    await Course.update(
      {
        name,
        description,
        duration,
        price,
      },
      { where: { id } }
    );

    const updatedCourse = await Course.findOne({ where: { id } });

    res.status(201).json(updatedCourse);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al actualizar un curso",
      500
    );
    return next(error);
  }
};

exports.disableCourseById = async (req, res, next) => {
  const UserRoleId = req.user.RoleId;
  const id = req.params.cid;

  if (UserRoleId !== 3) {
    const error = new HttpError(
      "Solo los usuarios con rol profesor pueden actualizar cursos",
      401
    );
    return next(error);
  }

  try {
    await Course.update(
      {
        isActive: false,
      },
      { where: { id } }
    );

    const updatedCourse = await Course.findOne({ where: { id } });

    res.status(201).json(updatedCourse);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError("Ha ocurrido un error al borrar un curso", 500);
    return next(error);
  }
};

exports.getCoursesByTeacher = async (req, res, next) => {
  const { page, pageSize, name } = req.query;
  const pageNumber = page ? parseInt(page) : 1;
  const limit = pageSize ? parseInt(pageSize) : 10;
  const offset = page ? parseInt(page) * limit : 0;

  try {
    const teacher = await User.findOne({
      where: { id: req.user.id, roleId: 3 },
    });

    if (!teacher) {
      const error = new HttpError(
        "Solo los usuarios con rol profesor pueden ver sus cursos",
        401
      );
      return next(error);
    }

    const courses = await Course.findAndCountAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${name ? name : ""}%`,
        },
        isActive: true,
        UserId: teacher.id,
      },
      limit,
      offset,
    });

    res.json({
      courses: courses.rows,
      pageNumber: pageNumber,
      pageSize: limit,
      count: courses.count,
    });
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al ver tus cursos como profesor",
      500
    );
    return next(error);
  }
};

exports.getCourses = async (req, res, next) => {
  const { page, pageSize, name } = req.query;
  const pageNumber = page ? parseInt(page) : 1;
  const limit = pageSize ? parseInt(pageSize) : 50;
  const offset = page ? parseInt(page) * limit : 0;

  try {
    const courses = await Course.findAndCountAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${name ? name : ""}%`,
        },
        isActive: true,
      },
      limit,
      offset,
      include: {
        model: User,
        attributes: ["firstname", "lastname"],
      },
    });

    res.json({
      courses: courses.rows,
      pageNumber: pageNumber,
      pageSize: limit,
      count: courses.count,
    });
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al cargar los datos",
      500
    );
    return next(error);
  }
};

exports.getCourseById = async (req, res, next) => {
  const id = req.params.cid;

  try {
    const course = await Course.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "firstname", "lastname"],
        },
        {
          model: Theme,
          include: [
            {
              model: Section,
              include: [
                {
                  model: Comment,
                  include: [
                    {
                      model: User,
                      attributes: ["id", "firstname", "lastname", "imageUrl"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!course) {
      const error = new HttpError("Curso no encontrado", 404);
      return next(error);
    }

    res.json(course);
  } catch (err) {
    const error = new HttpError(
      "Ha ocurrido un error al consultar los datos",
      500
    );
    return next(error);
  }
};

exports.getCoursesFromStudent = async (req, res, next) => {
  const id = req.params.uid;
  const UserRoleId = req.user.RoleId;

  if (UserRoleId !== 2) {
    const error = new HttpError(
      "Solo los usuarios con rol estudiante pueden ver sus cursos",
      401
    );
    return next(error);
  }

  try {
    const courses = await Course.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: Sequelize.literal(
            `(SELECT CourseId FROM Subscriptions WHERE UserId = ${id})`
          ),
        },
        isActive: true,
      },
    });

    res.json(courses);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al consultar los datos",
      500
    );
    return next(error);
  }
};

exports.getCoursesForStudentSubscription = async (req, res, next) => {
  const id = req.params.uid;

  try {
    const courses = await Course.findAll({
      where: {
        id: {
          [Sequelize.Op.notIn]: Sequelize.literal(
            `(SELECT CourseId FROM Subscriptions WHERE UserId = ${id})`
          ),
        },
        isActive: true,
      },
    });

    res.json(courses);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al consultar los datos",
      500
    );
    return next(error);
  }
};

exports.getStudentsFromSubscribedCourses = async (req, res, next) => {
  const CourseId = req.params.cid;
  const { page, pagesize, keyword } = req.query;
  const pageNumber = page ? parseInt(page) : 1;
  const limit = pagesize ? parseInt(pagesize) : 10;
  const offset = page ? parseInt(page) * limit : 0;

  try {
    const students = await User.findAndCountAll({
      where: {
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
      attributes: ["id", "email", "firstname", "lastname"],
      include: [
        {
          model: Subscription,
          where: { CourseId },
          attributes: [],
        },
      ],
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
      "Ha ocurrido un error al consultar los datos",
      500
    );
    return next(error);
  }
};
