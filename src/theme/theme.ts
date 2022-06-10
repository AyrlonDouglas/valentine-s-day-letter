import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
  },
  palette: {
    primary: { main: "#ff495c" },
    secondary: { main: "#011627" },
    success: { main: "#00916e" },
    warning: { main: "#ff9f1c" },
    info: { main: "#2ec4b6" },
    background: { default: "#fdfffc" },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        fontFamily: "Nunito", // NÂO FUNCIONA
      },
    },
  },
});

export default theme;
