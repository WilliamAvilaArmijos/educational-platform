import React, { Fragment, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Loading from "../../shared/components/UIElements/Loading";
import ErrorAlert from "../../shared/components/UIElements/ErrorAlert";

const SectionCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [video, setVideo] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate();
  const params = useParams();

  const changeHandler = async (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    }

    if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  };

  const changeVideoHandler = async (event) => {
    setFile(event.target.files[0]);
    setVideo(event.target.files[0].name);
  };

  const createSectionHandler = async (e) => {
    e.preventDefault();

    const storeData = JSON.parse(localStorage.getItem("userData"));

    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("video", file);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/sections/add/${params.sid}`,
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

      navigate(
        `/dashboard/courses/themes/${params.tid}/sections/${params.sid}`
      );
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
            label="Nombre de la clase"
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
          <Grid container spacing={2} marginTop={1}>
            <Grid item xs={6}>
              <Button variant="contained" component="label">
                Subir video
                <input hidden type="file" onChange={changeVideoHandler} />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="video"
                label="Nombre del video"
                name="video"
                disabled
                variant="standard"
                value={video}
                onChange={changeVideoHandler}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} marginTop={1}>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={createSectionHandler}
              >
                Crear sección
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Fragment>
  );
};

export default SectionCreate;
