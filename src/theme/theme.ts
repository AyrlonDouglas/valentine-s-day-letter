import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
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
