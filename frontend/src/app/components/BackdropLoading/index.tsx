import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

const BackdropLoading = () => {
  return (
    <Backdrop style={{ color: "#fff", zIndex: "9999" }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropLoading;
