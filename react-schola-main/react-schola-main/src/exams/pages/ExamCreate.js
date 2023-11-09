import React, { Fragment, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import Loading from "../../shared/components/UIElements/Loading";
import ErrorAlert from "../../shared/components/UIElements/ErrorAlert";

const ExamCreate = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
    {
      id: 2,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
    {
      id: 3,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
    {
      id: 4,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
    {
      id: 5,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
    {
      id: 6,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
    {
      id: 7,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
    {
      id: 8,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
    {
      id: 9,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
    {
      id: 10,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  ]);

  const navigate = useNavigate();
  const params = useParams();

  const questionChangeHandler = (event, index) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[index][name] = value;
    setQuestions(newQuestions);
  };

  const optionChangeHandler = (event, questionIndex, optionIndex) => {
    const { value } = event.target;
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const correctAnswerChangeHandler = (event, index) => {
    const { value } = event.target;
    const newQuestions = [...questions];
    newQuestions[index].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const storeData = JSON.parse(localStorage.getItem("userData"));

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/exams/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${storeData.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            questions,
            CourseId: params.cid,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      navigate(`/dashboard/courses`);
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  const clearErrorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && <ErrorAlert error={error} onClear={clearErrorHandler} />}
      <Loading loading={isLoading} />
      <Box
        component="form"
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          "& .MuiTextField-root": { marginBottom: 1 },
          m: "auto",
          width: { lg: "40%", md: "50%", sm: "flex", xs: "flex" },
        }}
      >
        <Paper elevation={3} sx={{ p: 3 }}>
          <TextField
            label="Título"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            fullWidth
            margin="normal"
          />
          {questions.map((question, index) => (
            <FormControl key={question.id} fullWidth margin="normal">
              <TextField
                label={`Pregunta ${index + 1}`}
                value={question.question}
                name="question"
                onChange={(event) => questionChangeHandler(event, index)}
                fullWidth
              />
              {[0, 1, 2, 3].map((optionIndex) => (
                <TextField
                  key={optionIndex}
                  label={`Opción ${optionIndex + 1}`}
                  value={question.options[optionIndex]}
                  onChange={(event) =>
                    optionChangeHandler(event, index, optionIndex)
                  }
                  fullWidth
                />
              ))}
              <FormControl
                fullWidth
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel id="select-correct-answer-label">
                  Respuesta correcta
                </InputLabel>
                <Select
                  labelId="select-correct-answer-label"
                  id="select-correct-answer"
                  label="Respuesta correcta"
                  variant="standard"
                  displayEmpty
                  value={question.correctAnswer}
                  onChange={(event) => correctAnswerChangeHandler(event, index)}
                >
                  {[0, 1, 2, 3].map((optionIndex) => (
                    <MenuItem key={optionIndex} value={optionIndex}>
                      Opción {optionIndex + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormControl>
          ))}
          <Grid container spacing={2} marginTop={1}>
            <Button fullWidth variant="contained" onClick={submitHandler}>
              Crear examen
            </Button>
          </Grid>
        </Paper>
      </Box>
    </Fragment>
  );
};

export default ExamCreate;
