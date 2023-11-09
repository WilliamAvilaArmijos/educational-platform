import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Loading from "../../shared/components/UIElements/Loading";
import ErrorAlert from "../../shared/components/UIElements/ErrorAlert";

const StudentCreate = () => {
  const values = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    city: "",
    country: "",
    phone: "",
    RoleId: 2,
  };

  const [userInput, setUserInput] = useState(values);
  const [birthday, setBirthday] = useState(null);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate();

  const changeHandler = async (e) => {
    setUserInput((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const changeImageHandler = async (event) => {
    setFile(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

  const createUserHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();
    formData.append("email", userInput.email);
    formData.append("password", userInput.password);
    formData.append("firstname", userInput.firstname);
    formData.append("lastname", userInput.lastname);
    formData.append("city", userInput.city);
    formData.append("country", userInput.country);
    formData.append("birthday", birthday);
    formData.append("phone", userInput.phone);
    formData.append("image", file);
    formData.append("RoleId", 2);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      navigate("/dashboard/students");
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
            id="email"
            label="Correo electrónico"
            name="email"
            variant="standard"
            value={userInput.email}
            onChange={changeHandler}
          />
          <FormControl fullWidth variant="standard" sx={{ marginBottom: 1 }}>
            <InputLabel htmlFor="create-password">Contraseña</InputLabel>
            <Input
              id="create-password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={userInput.password}
              onChange={changeHandler}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={showPasswordHandler}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <TextField
            fullWidth
            id="firstname"
            label="Nombre"
            name="firstname"
            variant="standard"
            value={userInput.firstname}
            onChange={changeHandler}
          />
          <TextField
            fullWidth
            id="lastname"
            label="Apellido"
            name="lastname"
            variant="standard"
            value={userInput.lastname}
            onChange={changeHandler}
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Fecha de nacimiento"
              value={birthday}
              onChange={(newValue) => {
                setBirthday(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth variant="standard" />
              )}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            id="city"
            label="Ciudad"
            name="city"
            variant="standard"
            value={userInput.city}
            onChange={changeHandler}
          />
          <TextField
            fullWidth
            id="country"
            label="País"
            name="country"
            variant="standard"
            value={userInput.country}
            onChange={changeHandler}
          />
          <TextField
            fullWidth
            id="phone"
            label="Teléfono"
            name="phone"
            variant="standard"
            value={userInput.phone}
            onChange={changeHandler}
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
              <Button fullWidth variant="contained" onClick={createUserHandler}>
                Crear Usuario
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Fragment>
  );
};

export default StudentCreate;
