import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Loading from "../../shared/components/UIElements/Loading";
import ErrorAlert from "../../shared/components/UIElements/ErrorAlert";

const CourseEdit = () => {
  const navigate = useNavigate();
  const params = useParams();

  const onlyNumbersRegex = /^-?\d*\.?\d*$/;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem("userData"));

    const getUserById = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/courses/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${storeData.token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setName(data.name);
        setDescription(data.description);
        setDuration(data.duration);
        setPrice(data.price);
      } catch (err) {
        setError("Error al consultar los datos, inténtelo de nuevo");
      }
      setIsLoading(false);
    };

    getUserById();
  }, [params.id]);

  const changeHandler = async (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    }

    if (e.target.name === "description") {
      setDescription(e.target.value);
    }

    if (e.target.name === "duration") {
      const durationVal = e.target.value;
      if (/^\d*$/.test(durationVal)) {
        setDuration(durationVal);
      }
    }

    if (e.target.name === "price") {
      const priceVal = e.target.value;
      if (onlyNumbersRegex.test(priceVal)) {
        setPrice(e.target.value);
      }
    }
  };

  const clearErrorHandler = () => {
    setError(null);
  };

  const updateCourseHandler = async (e) => {
    e.preventDefault();

    const storeData = JSON.parse(localStorage.getItem("userData"));

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/courses/${params.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${storeData.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            description: description,
            price: price,
            duration: duration,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      navigate("/dashboard/courses");
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  return (
    <Fragment>
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
        {error && <ErrorAlert error={error} onClear={clearErrorHandler} />}

        <Loading loading={isLoading} />
        {!isLoading && name && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <TextField
              fullWidth
              id="name"
              label="Nombre del curso"
              name="name"
              variant="standard"
              value={name}
              onChange={changeHandler}
            />
            <TextField
              fullWidth
              id="description"
              label="Descripción"
              name="description"
              variant="standard"
              value={description}
              onChange={changeHandler}
            />
            <TextField
              fullWidth
              id="duration"
              label="Duración en horas"
              name="duration"
              variant="standard"
              value={duration}
              onChange={changeHandler}
              inputProps={{
                pattern: "[0-9]*",
                inputMode: "numeric",
              }}
            />
            <TextField
              fullWidth
              id="price"
              label="Precio"
              name="price"
              variant="standard"
              value={price}
              onChange={changeHandler}
              inputProps={{
                pattern: "^-?\\d*\\.?\\d*$",
                inputMode: "decimal",
                maxLength: 5,
              }}
            />
            <Grid container spacing={2} marginTop={1}>
              <Button
                fullWidth
                variant="contained"
                onClick={updateCourseHandler}
              >
                Actualizar Curso
              </Button>
            </Grid>
          </Paper>
        )}
      </Box>
    </Fragment>
  );
};

export default CourseEdit;
