import React from "react";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

const SuccessAlert = (props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Alert
        severity="success"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={props.onClear}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {props.message}
      </Alert>
    </Box>
  );
};

export default SuccessAlert;
