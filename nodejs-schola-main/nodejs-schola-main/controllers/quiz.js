const HttpError = require("../utils/http-error");

const User = require("../models/user");
const Quiz = require("../models/quiz");
const QuizScore = require("../models/quiz-score");
const Section = require("../models/section");
const Theme = require("../models/theme");
const Course = require("../models/course");

exports.createQuizByTeacher = async (req, res, next) => {
  const { title, description, questions, ThemeId, CourseId } = req.body;
  const UserId = req.user.id;
  const UserRoleId = req.user.RoleId;

  if (UserRoleId !== 3) {
    const error = new HttpError(
      "Solo los usuarios con rol profesor pueden crear pruebas",
      401
    );
    return next(error);
  }

  try {
    const theme = await Theme.findOne({
      where: { id: parseInt(ThemeId) },
    });

    if (!theme) {
      const error = new HttpError("Sección no encontrada", 404);
      return next(error);
    }

    const quiz = await Quiz.create({
      title,
      description,
      questions,
      SectionId: theme.id,
      ThemeId,
      CourseId,
      UserId,
    });

    res.json(quiz);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError("Ha ocurrido un error al crear la prueba", 500);
    return next(error);
  }
};

exports.submitQuizByStudent = async (req, res, next) => {
  const { quizId, responses } = req.body;
  const UserRoleId = req.user.RoleId;
  let score = 0;

  if (UserRoleId !== 2) {
    const error = new HttpError(
      "Solo los usuarios con rol estudiante pueden contestar la prueba",
      401
    );
    return next(error);
  }

  try {
    const student = await User.findOne({
      where: { id: req.user.id },
    });

    if (!student) {
      const error = new HttpError("Estudiante no encontrado", 404);
      return next(error);
    }

    const quiz = await Quiz.findOne({
      where: { id: quizId },
    });

    if (!quiz) {
      const error = new HttpError("Prueba no encontrado", 404);
      return next(error);
    }

    const questions = JSON.parse(quiz.questions);

    for (let i = 0; i < responses.length; i++) {
      const response = responses[i];
      const questionId = response.questionId;
      const selectedOption = response.selectedOption;

      const question = questions.find((q) => q.id === questionId);

      if (
        question &&
        parseInt(question.correctAnswer) === parseInt(selectedOption)
      ) {
        score += 1;

        response.isCorrect = true;
      } else {
        response.isCorrect = false;
      }
    }

    const quizScore = await QuizScore.create({
      score: score,
      responses: responses,
      QuizId: quiz.id,
      UserId: student.id,
    });

    res.status(201).json(quizScore);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al subir las respuestas",
      500
    );
    return next(error);
  }
};

exports.getQuizByThemeId = async (req, res, next) => {
  const ThemeId = req.params.tid;
  try {
    const quiz = await Quiz.findOne({
      where: {
        ThemeId: ThemeId,
      },
    });

    if (!quiz) {
      const error = new HttpError("Prueba no encontrado", 404);
      return next(error);
    }

    res.status(200).json(quiz);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al obtener los datos",
      500
    );
    return next(error);
  }
};

exports.getQuizzesScoreByStudentId = async (req, res, next) => {
  const UserId = req.params.uid;

  try {
    const quizzes = await QuizScore.findAll({
      where: {
        UserId,
      },
    });

    res.json(quizzes);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al obtener los datos",
      500
    );
    return next(error);
  }
};

exports.getQuizScoreByStudentAndCourse = async (req, res, next) => {
  const UserId = req.params.uid;
  const CourseId = req.params.cid;

  try {
    const quizScores = await QuizScore.findAll({
      include: [
        {
          model: Quiz,
          include: [
            {
              model: Theme,
              where: { CourseId },
              attributes: [],
            },
          ],
          attributes: ["title", "description"],
        },
        {
          model: User,
          where: { id: UserId },
          attributes: ["firstname", "lastname"],
        },
      ],
      where: { UserId },
    });

    res.json(quizScores);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al obtener los datos",
      500
    );
    return next(error);
  }
};
