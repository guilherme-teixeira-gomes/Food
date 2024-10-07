import Typography from "@mui/material/Typography";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Title(props: Props) {
  return (
    <Typography
      variant="h5"
      style={{ color: "#5b626b", fontWeight: "bold",}}
      gutterBottom
    >
      {props.children}
    </Typography>
  );
}
