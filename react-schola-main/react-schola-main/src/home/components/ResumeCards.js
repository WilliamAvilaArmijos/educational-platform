import React, { Fragment } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const ResumeCards = (props) => {
  return (
    <Fragment>
      {props.resume.map((item) => (
        <Paper key={item.id} elevation={3} sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5">
              {item.Role.toUpperCase()} {item.count}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Fragment>
  );
};

export default ResumeCards;
