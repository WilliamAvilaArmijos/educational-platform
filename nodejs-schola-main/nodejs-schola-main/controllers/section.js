require("dotenv").config();
const Sequelize = require("sequelize");
const AWS = require("aws-sdk");

const HttpError = require("../utils/http-error");

const User = require("../models/user");
const Theme = require("../models/theme");
const Section = require("../models/section");

AWS.config.update({
  region: process.env.BUCKETEER_AWS_REGION,
  accessKeyId: process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

exports.createSectionByThemeId = async (req, res, next) => {
  const { name, description } = req.body;
  const ThemeId = req.params.tid;

  try {
    const theme = await Theme.findOne({
      where: {
        id: ThemeId,
      },
    });

    if (!theme) {
      const error = new HttpError("Tema no encontrado", 404);
      return next(error);
    }

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

      const section = await Section.create({
        name,
        description,
        videoUrl: url,
        ThemeId: theme.id,
      });

      res.status(201).json(section);
    });
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al crear una sección",
      500
    );
    return next(error);
  }
};

exports.getSectionsByThemeIdByTeacher = async (req, res, next) => {
  const { page, pageSize, name } = req.query;
  const ThemeId = req.params.tid;
  const pageNumber = page ? parseInt(page) : 1;
  const limit = pageSize ? parseInt(pageSize) : 10;
  const offset = page ? parseInt(page) * limit : 0;

  try {
    const teacher = await User.findOne({
      where: { id: req.user.id, roleId: 3 },
    });

    if (!teacher) {
      const error = new HttpError(
        "Solo los usuarios con rol profesor pueden ver sus secciones",
        500
      );
      return next(error);
    }

    const theme = await Theme.findOne({
      where: {
        id: ThemeId,
      },
    });

    if (!theme) {
      const error = new HttpError("Tema no encontrado", 404);
      return next(error);
    }

    const sections = await Section.findAndCountAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${name ? name : ""}%`,
        },
        ThemeId: theme.id,
      },
      limit,
      offset,
    });

    res.json({
      sections: sections.rows,
      pageNumber: pageNumber,
      pageSize: limit,
      count: sections.count,
    });
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al ver tus secciones por tema como profesor",
      500
    );
    return next(error);
  }
};

exports.getSectionById = async (req, res, next) => {
  const SectionId = req.params.sid;

  try {
    const section = await Section.findOne({ where: { id: SectionId } });

    res.json(section);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al cargar los datos",
      500
    );
    return next(error);
  }
};
