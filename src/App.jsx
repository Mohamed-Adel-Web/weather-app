/** @format */

import Weather from "./component/Weather";
import "./App.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";


const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});
function App() {

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#1565c0",
          height: "100vh",
          backgroundColor: "#1565c0",
        }}
      >
        <Weather />
      </div>
    </ThemeProvider>
  );
}

export default App;
