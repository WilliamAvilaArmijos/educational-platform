import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Loading from "../../shared/components/UIElements/Loading";
import ErrorAlert from "../../shared/components/UIElements/ErrorAlert";

const CourseCreate = () => {
  const onlyNumbersRegex = /^-?\d*\.?\d*$/;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate();

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

  const changeImageHandler = async (event) => {
    setFile(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const createCourseHandler = async (e) => {
    e.preventDefault();

    const storeData = JSON.parse(localStorage.getItem("userData"));

    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("price", price);
    formData.append("image", file);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/courses/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${storeData.token}`,
          },
          body: formData,
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
            <Grid item xs={6}>
              <Button variant="contained" component="label">
                Subir imagen
                <input hidden type="file" onChange={changeImageHandler} />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Box
                component="img"
                sx={{
                  height: 233,
                  width: "auto",
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt=""
                src={image}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} marginTop={1}>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={createCourseHandler}
              >
                Crear curso
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Fragment>
  );
};

export default CourseCreate;
