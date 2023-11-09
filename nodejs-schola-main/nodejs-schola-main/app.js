const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./config/db");

const HttpError = require("./utils/http-error");

const roleRoutes = require("./routes/role");
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");
const themeRoutes = require("./routes/theme");
const sectionRoutes = require("./routes/section");
const subscriptionRoutes = require("./routes/subscription");
const quizRoutes = require("./routes/quiz");
const examRoutes = require("./routes/exam");
const commentRoutes = require("./routes/comment");

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const options = {
  origin: "*",
};

app.use(cors(options));

app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/themes", themeRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("Online Schola");
});

app.use((req, res) => {
  const error = new HttpError(
    `La siguiente API no fue encontrada: ${req.originalUrl}`,
    404
  );
  throw error;
});

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }

  res.status(err.code || 500);

  res.json({ message: err.message || "Error desconocido", stack: err.stack });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log("Conexión establecida a la base de datos");

    app.listen(PORT, () => {
      console.log(
        `Servidor corriendo en modo ${process.env.NODE_ENV} en el puerto ${process.env.PORT}`
      );
    });
  } catch (err) {
    console.error({
      message: err.message || "Error desconocido",
      stack: err.stack,
    });
  }
};

startServer();
