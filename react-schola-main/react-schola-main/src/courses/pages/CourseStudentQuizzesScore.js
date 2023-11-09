import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Loading from "../../shared/components/UIElements/Loading";
import ErrorAlert from "../../shared/components/UIElements/ErrorAlert";

const CourseStudentQuizzesScore = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const params = useParams();

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem("userData"));

    const getQuizzesScore = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/quizzes/course/${params.cid}/user/${params.eid}`,
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

        setStudents(data);
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    };

    getQuizzesScore();
  }, [params]);

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
        {!isLoading && students && (
          <List>
            {students.map((student) => (
              <ListItem key={student.id} alignItems="flex-start">
                <ListItemText
                  primary={student.Quiz.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Calificación
                      </Typography>
                      {`: ${student.score}`}
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
            <Divider variant="inset" component="li" />
          </List>
        )}
      </Box>
    </Fragment>
  );
};

export default CourseStudentQuizzesScore;
