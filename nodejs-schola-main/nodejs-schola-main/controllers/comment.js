const Sequelize = require("sequelize");

const HttpError = require("../utils/http-error");

const User = require("../models/user");
const Comment = require("../models/comment");
const Section = require("../models/section");

exports.createComment = async (req, res, next) => {
  const { message, SectionId } = req.body;
  const UserId = req.user.id;

  try {
    const comment = await Comment.create({
      message,
      UserId,
      SectionId,
    });

    const newComment = await Comment.findOne({
      include: [
        {
          model: Section,
          where: { id: SectionId },
          attributes: [],
        },
        {
          model: User,
          attributes: ["id", "firstname", "lastname", "imageUrl"],
        },
      ],
      where: comment.id,
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al crear el comentario",
      500
    );
    return next(error);
  }
};

exports.getCommentsBySectionId = async (req, res, next) => {
  const SectionId = req.params.sid;

  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: Section,
          where: { id: SectionId },
          attributes: [],
        },
        {
          model: User,
          attributes: ["firstname", "lastname", "imageUrl"],
        },
      ],
    });

    res.json(comments);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al consultar los datos",
      500
    );
    return next(error);
  }
};
