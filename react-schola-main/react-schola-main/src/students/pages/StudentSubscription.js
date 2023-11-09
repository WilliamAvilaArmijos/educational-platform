import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import Loading from "../../shared/components/UIElements/Loading";
import ErrorAlert from "../../shared/components/UIElements/ErrorAlert";

const StudentSubscription = () => {
  const navigate = useNavigate();
  const params = useParams();

  const values = {
    email: "",
    firstname: "",
    lastname: "",
  };

  const [user, setUser] = useState(values);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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
      } catch (err) {
        setError("Error al consultar los datos, inténtelo de nuevo");
      }

      setIsLoading(false);
    };

    getUserById();
  }, [params.id]);

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem("userData"));

    const getCourses = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/courses/${params.id}/student`,
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

        setCourses(data);
      } catch (err) {
        setError("Error al consultar los datos, inténtelo de nuevo");
      }

      setIsLoading(false);
    };

    getCourses();
  }, [params.id]);

  const changeHandler = (e) => {
    setUser((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const clearErrorHandler = () => {
    setError(null);
  };

  const createSubscriptionHandler = async (e) => {
    e.preventDefault();

    const storeData = JSON.parse(localStorage.getItem("userData"));

    setIsLoading(true);

    const course = courses.find((c) => c.id === selectedCourse);
    const subtotal = course.price / 1.12;
    const iva = course.price - subtotal;
    const total = course.price;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/subscriptions/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${storeData.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subtotal,
            iva,
            total,
            paymentMethod,
            UserId: user.id,
            CourseId: selectedCourse,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);

    navigate("/dashboard/students");
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
        <Paper elevation={3} sx={{ p: 3 }}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            name="email"
            variant="standard"
            disabled
            value={user.email}
            onChange={changeHandler}
          />
          <TextField
            fullWidth
            id="firstname"
            label="First Name"
            name="firstname"
            variant="standard"
            disabled
            value={user.firstname}
            onChange={changeHandler}
          />
          <TextField
            fullWidth
            id="lastname"
            label="Last Name"
            name="lastname"
            variant="standard"
            disabled
            value={user.lastname}
            onChange={changeHandler}
          />
          {!isLoading && courses && (
            <FormControl fullWidth variant="standard" sx={{ marginBottom: 1 }}>
              <InputLabel id="select-course-label">Cursos</InputLabel>
              <Select
                labelId="select-course-label"
                id="select-course"
                label="Cursos"
                variant="standard"
                displayEmpty
                name="CourseId"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {courses.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <FormControl fullWidth variant="standard" sx={{ marginBottom: 1 }}>
            <InputLabel id="select-payment-method-label">
              Método de pago
            </InputLabel>
            <Select
              labelId="select-payment-method-label"
              id="select-payment-method"
              label="Método de pago"
              variant="standard"
              displayEmpty
              name="CourseId"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value={"efectivo"}>{"Efectivo"}</MenuItem>
              <MenuItem value={"transferencia"}>
                {"Transferencia Bancaria"}
              </MenuItem>
            </Select>
          </FormControl>
          {error && <ErrorAlert error={error} onClear={clearErrorHandler} />}

          <Grid container spacing={2} marginTop={1}>
            <Button
              fullWidth
              variant="contained"
              onClick={createSubscriptionHandler}
            >
              Inscribir Estudiante
            </Button>
          </Grid>
        </Paper>
      </Box>
    </Fragment>
  );
};

export default StudentSubscription;
