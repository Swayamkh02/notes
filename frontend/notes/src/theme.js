import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: purple[500], // You can adjust this to 300, 700, etc. if desired
    },
  },
});

export default darkTheme;
