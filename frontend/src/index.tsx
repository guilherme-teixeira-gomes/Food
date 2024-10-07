import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./style.css";

import CssBaseline from "@mui/material/CssBaseline";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <CssBaseline>
    <App />
  </CssBaseline>,
);

// ReactDOM.render(
// 	<React.StrictMode>
// 		<CssBaseline>
// 			<App />
// 		</CssBaseline>,
//   </React.StrictMode>

// 	document.getElementById("root")
// );
