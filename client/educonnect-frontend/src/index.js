import React from "react";
import AppRouter from "../src/pages/Router";
import { ThemeProvider } from "@mui/material";
import theme from "./themes/Theme";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  </ThemeProvider>
);
