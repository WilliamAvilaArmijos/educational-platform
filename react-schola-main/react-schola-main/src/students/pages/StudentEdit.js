import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Loading from "../../shared/components/UIElements/Loading";
import ErrorAlert from "../../shared/components/UIElements/ErrorAlert";
import SuccessAlert from "../../shared/components/UIElements/SuccessAlert";

const StudentEdit = () => {
  const navigate = useNavigate();
  const params = useParams();

  const values = {
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    city: "",
    country: "",
    phone: "",
  };

  const [user, setUser] = useState(values);
  const [showPassword, setShowPassword] = useState(false);
  const [birthday, setBirthday] = useState();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem("userData"));

    const getUserById = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/users/${params.id}/student`,
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

        setUser(data);
        setBirthday(data.birthday);
      } catch (err) {
        setError("Error al consultar los datos, inténtelo de nuevo");
      }

      setMessage(
        "Recuerde ingresar la Contraseña y la imagen de nuevo para actualizar"
      );
      setIsLoading(false);
    };

    getUserById();
  }, [params.id]);

  const changeHandler = (e) => {
    setUser((prevState) => {
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

  const clearErrorHandler = () => {
    setError(null);
  };

  const clearMessageHandler = () => {
    setMessage(null);
  };

  const updateUserHandler = async (e) => {
    e.preventDefault();

    const storeData = JSON.parse(localStorage.getItem("userData"));

    setIsLoading(true);

    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("firstname", user.firstname);
    formData.append("lastname", user.lastname);
    formData.append("city", user.city);
    formData.append("country", user.country);
    formData.append("birthday", birthday);
    formData.append("phone", user.phone);
    formData.append("image", file);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/${params.id}/update`,
        {
          method: "PUT",
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

      navigate("/dashboard/students");
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

        {message && (
          <SuccessAlert message={message} onClear={clearMessageHandler} />
        )}

        <Loading loading={isLoading} />
        {!isLoading && user && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <TextField
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              variant="standard"
              value={user.email}
              onChange={changeHandler}
            />
            <TextField
              fullWidth
              id="firstname"
              label="Nombre"
              name="firstname"
              variant="standard"
              value={user.firstname}
              onChange={changeHandler}
            />
            <TextField
              fullWidth
              id="lastname"
              label="Apellido"
              name="lastname"
              variant="standard"
              value={user.lastname}
              onChange={changeHandler}
            />
            <FormControl fullWidth variant="standard" sx={{ marginBottom: 1 }}>
              <InputLabel htmlFor="create-password">Contraseña</InputLabel>
              <Input
                id="create-password"
                name="password"
                required
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={changeHandler}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={showPasswordHandler}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
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
              value={user.city}
              onChange={changeHandler}
            />
            <TextField
              fullWidth
              id="country"
              label="País"
              name="country"
              variant="standard"
              value={user.country}
              onChange={changeHandler}
            />
            <TextField
              fullWidth
              id="phone"
              label="Teléfono"
              name="phone"
              variant="standard"
              value={user.phone}
              onChange={changeHandler}
            />
            <Grid container spacing={2} marginTop={1}>
              <Grid item xs={6}>
                <Button variant="contained" component="label">
                  Subir imagen
                  <input
                    hidden
                    type="file"
                    required
                    onChange={changeImageHandler}
                  />
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
              <Button fullWidth variant="contained" onClick={updateUserHandler}>
                Actualizar Estudiante
              </Button>
            </Grid>
          </Paper>
        )}
      </Box>
    </Fragment>
  );
};

export default StudentEdit;
