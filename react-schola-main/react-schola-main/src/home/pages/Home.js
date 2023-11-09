import React, { useState, useEffect, Fragment } from "react";

import Box from "@mui/material/Box";

import Loading from "../../shared/components/UIElements/Loading";
import ErrorAlert from "../../shared/components/UIElements/ErrorAlert";

import ResumeCards from "../components/ResumeCards";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [resume, setResume] = useState();

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem("userData"));

    const getResume = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/users/resume`,
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

        setResume(data);
      } catch (err) {
        setError("Error al consultar los datos, inténtelo de nuevo");
      }

      setIsLoading(false);
    };

    getResume();
  }, []);

  const clearErrorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && <ErrorAlert error={error} onClear={clearErrorHandler} />}
      <Loading loading={isLoading} />
      <Box
        sx={{
          display: { lg: "grid", md: "flex", sm: "flex", xs: "flex" },
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "minmax(100px, auto)",
          gap: 4,
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        {!isLoading && resume && (
          <Fragment>
            <ResumeCards resume={resume} />
          </Fragment>
        )}
      </Box>
    </Fragment>
  );
};

export default Home;
