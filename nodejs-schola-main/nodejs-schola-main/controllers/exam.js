const HttpError = require("../utils/http-error");

const User = require("../models/user");
const Exam = require("../models/exam");
const ExamScore = require("../models/exam-score");
const Course = require("../models/course");

exports.createExamByTeacher = async (req, res, next) => {
  const { title, description, questions, CourseId } = req.body;
  const UserId = req.user.id;
  const UserRoleId = req.user.RoleId;

  if (UserRoleId !== 3) {
    const error = new HttpError(
      "Solo los usuarios con rol profesor pueden crear examenes",
      401
    );
    return next(error);
  }

  try {
    const course = await Course.findOne({
      where: { id: CourseId },
    });

    if (!course) {
      const error = new HttpError("Curso no encontrado", 404);
      return next(error);
    }

    const exam = await Exam.create({
      title,
      description,
      questions,
      CourseId: course.id,
      UserId,
    });

    res.json(exam);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError("Ha ocurrido un error al crear el examen", 500);
    return next(error);
  }
};

exports.submitExamByStudent = async (req, res, next) => {
  const { examId, responses } = req.body;
  const UserRoleId = req.user.RoleId;
  let score = 0;

  if (UserRoleId !== 2) {
    const error = new HttpError(
      "Solo los usuarios con rol estudiante pueden contestar el examen",
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

    const exam = await Exam.findOne({
      where: { id: examId },
    });

    if (!exam) {
      const error = new HttpError("Examen no encontrado", 404);
      return next(error);
    }

    const questions = JSON.parse(exam.questions);

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

    const examScore = await ExamScore.create({
      score: score,
      responses: responses,
      ExamId: exam.id,
      UserId: student.id,
    });

    res.status(201).json(examScore);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al subir las respuestas",
      500
    );
    return next(error);
  }
};

exports.getExamByCourseId = async (req, res, next) => {
  const CourseId = req.params.cid;

  try {
    const exam = await Exam.findOne({
      where: {
        CourseId,
      },
    });

    if (!exam) {
      const error = new HttpError("Examen no encontrado", 404);
      return next(error);
    }

    res.status(200).json(exam);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al obtener los datos",
      500
    );
    return next(error);
  }
};

exports.getExamsScoreByStudentAndCourse = async (req, res, next) => {
  const UserId = req.params.uid;
  const CourseId = req.params.cid;

  try {
    const examScores = await ExamScore.findAll({
      include: [
        {
          model: Exam,
          where: { CourseId },
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

    res.json(examScores);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al obtener los datos",
      500
    );
    return next(error);
  }
};
