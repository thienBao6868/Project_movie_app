import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      mode: "dark",
      danger: {
        main: '#de0d29',
        
      },
      play: {
        main: '#fff'
      },
      info:{
        main: '#bdc3c7'
      }
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: "'Work Sans', sans-serif",
      h5: {
        fontWeight: 800,
        letterSpacing: 3,
      },
      h6: {
        fontSize: "28px",
        fontWeight: 600,
      },
      body: {
        fontSize: "18px",
        fontWeight: 300,
      },
      body1: {
        fontWeight: 600,
      },
      
    },
  };

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;