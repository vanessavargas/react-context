import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css";
import AppRoutes from "./routes";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2A9F85",
    },
    secondary: {
      main: "#FF7070",
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AppRoutes/>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
